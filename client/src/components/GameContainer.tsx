/**
 * GameContainer - Componente Principal do Jogo "Jogo de Máscaras"
 * Design: Teatralismo Dramático - Preto + Laranja + Ouro
 * Tipografia: Playfair Display (títulos) + Inter (corpo)
 * Sistema de Papéis: Debate (Defensor, Contestador, Mediador, Infiltrado)
 * Baseado no código original funcional
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface Player {
  name: string;
}

interface Role {
  name: string;
  role: string;
}

type GamePhase = 'setup' | 'chooseTheme' | 'pickStar' | 'showRoles' | 'discussion' | 'voting' | 'results';

const TOPICS = [
  'Trair é justificável?',
  'Dinheiro traz felicidade?',
  'O telemóvel estraga relações?',
  'Mentir é aceitável?',
  'Amizade entre ex funciona?',
  'Ciúmes é sinal de amor?',
  'Perdoar tudo numa relação?',
  'Segredos devem ser sempre revelados?',
  'Trabalho é mais importante que família?',
  'Tecnologia nos torna mais felizes?'
];

const ROLE_DESCRIPTIONS: { [key: string]: string } = {
  '🎤 Defensor': 'Defende a verdade. Sabe a resposta correta e a deve defender durante o debate.',
  '🎤 Contestador': 'Questiona tudo. Tenta descobrir quem está a mentir através de perguntas inteligentes.',
  '🤐 Mediador': 'Neutro e observador. Conhece todos os segredos e vota com base na lógica.',
  '🎭 Infiltrado': 'O impostor! Finge ser Defensor mas é secretamente um Contestador. Engana todos!'
};

export default function GameContainer() {
  const { playApplause, playBoo, playVoteConfirm } = useSoundEffects();

  // Estados principais
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [star, setStar] = useState('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  
  // Estados para mostrar papéis
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleRevealed, setRoleRevealed] = useState(false);
  
  // Estados para votação
  const [votes, setVotes] = useState<Array<{ voter: string; target: string; role: string }>>([]);
  const [voteIndex, setVoteIndex] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState('');

  // Adicionar jogador
  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 10) {
      const newScores = { ...scores };
      newScores[newPlayerName.trim()] = 0;
      setPlayers([...players, { name: newPlayerName.trim() }]);
      setScores(newScores);
      setNewPlayerName('');
    }
  };

  // Remover jogador
  const removePlayer = (index: number) => {
    const removed = players[index];
    setPlayers(players.filter((_, i) => i !== index));
    const newScores = { ...scores };
    delete newScores[removed.name];
    setScores(newScores);
  };

  // Começar jogo
  const startGame = () => {
    if (players.length < 4) {
      alert('Mínimo 4 jogadores para começar');
      return;
    }
    setPhase('chooseTheme');
  };

  // Escolher tema
  const chooseTheme = (topic: string) => {
    setSelectedTopic(topic);
    setPhase('pickStar');
  };

  // Escolher estrela
  const pickStar = () => {
    const randomStar = players[Math.floor(Math.random() * players.length)];
    setStar(randomStar.name);
    assignRoles(randomStar.name);
  };

  // Atribuir papéis
  const assignRoles = (starName: string) => {
    const others = players
      .filter(p => p.name !== starName)
      .sort(() => 0.5 - Math.random());

    const newRoles: Role[] = [];

    if (players.length === 4) {
      newRoles.push({ name: others[0].name, role: '🎤 Defensor' });
      newRoles.push({ name: others[1].name, role: '🎤 Contestador' });
      newRoles.push({ name: others[2].name, role: '🤐 Mediador' });
    } else if (players.length === 5) {
      newRoles.push({ name: others[0].name, role: '🎤 Defensor' });
      newRoles.push({ name: others[1].name, role: '🎤 Contestador' });
      newRoles.push({ name: others[2].name, role: '🤐 Mediador' });
      newRoles.push({ name: others[3].name, role: '🎭 Infiltrado' });
    } else {
      newRoles.push({ name: others[0].name, role: '🎤 Defensor' });
      newRoles.push({ name: others[1].name, role: '🎤 Contestador' });
      newRoles.push({ name: others[2].name, role: '🤐 Mediador' });
      for (let i = 3; i < others.length; i++) {
        newRoles.push({ name: others[i].name, role: '🎭 Infiltrado' });
      }
    }

    setRoles(newRoles);
    setRoleIndex(0);
    setRoleRevealed(false);
    setPhase('showRoles');
  };

  // Revelar próximo papel
  const revealNextRole = () => {
    if (roleIndex < roles.length - 1) {
      setRoleIndex(roleIndex + 1);
      setRoleRevealed(false);
    } else {
      setPhase('discussion');
    }
  };

  // Começar votação
  const startVoting = () => {
    setVotes([]);
    setVoteIndex(0);
    setSelectedTarget('');
    setPhase('voting');
  };

  // Guardar voto
  const saveVote = (target: string, role: string) => {
    const voter = players[voteIndex];
    const newVotes = [...votes, { voter: voter.name, target, role }];
    setVotes(newVotes);
    playVoteConfirm();

    if (voteIndex < players.length - 1) {
      setVoteIndex(voteIndex + 1);
      setSelectedTarget('');
    } else {
      calculateResults(newVotes);
    }
  };

  // Calcular resultados
  const calculateResults = (finalVotes: Array<{ voter: string; target: string; role: string }>) => {
    const newScores = { ...scores };

    finalVotes.forEach((vote, index) => {
      const realRole = roles.find(r => r.name === vote.target);
      if (realRole && realRole.role === vote.role) {
        newScores[vote.voter] = (newScores[vote.voter] || 0) + 2;
        setTimeout(() => playApplause(), index * 400);
      } else {
        setTimeout(() => playBoo(), index * 400);
      }
    });

    setTimeout(() => {
      setScores(newScores);
      setPhase('results');
    }, finalVotes.length * 400 + 2000);
  };

  // Recomeçar jogo
  const resetGame = () => {
    setPhase('setup');
    setPlayers([]);
    setNewPlayerName('');
    setSelectedTopic('');
    setStar('');
    setRoles([]);
    setScores({});
    setRoleIndex(0);
    setRoleRevealed(false);
    setVotes([]);
    setVoteIndex(0);
    setSelectedTarget('');
  };

  // ===== RENDER FASES =====

  // SETUP: Adicionar jogadores
  if (phase === 'setup') {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <div
          className="relative h-80 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(10,10,10,0.9), rgba(255,107,53,0.3)), url("https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=1200&h=400&fit=crop")',
            backgroundSize: 'cover'
          }}
        >
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display' }}>
              Jogo de Máscaras
            </h1>
            <p className="text-xl text-orange-300">Debate, Engano e Verdade</p>
          </div>
        </div>

        <div className="container py-12 flex-1">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">👥</span>
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display' }}>
                  Adicionar Jogadores
                </h2>
              </div>

              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Nome do jogador..."
                  value={newPlayerName}
                  onChange={e => setNewPlayerName(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && addPlayer()}
                  className="flex-1 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  onClick={addPlayer}
                  className="bg-primary hover:bg-orange-600 text-white px-6 py-3"
                >
                  Adicionar
                </Button>
              </div>

              {players.length > 0 && (
                <div className="mb-6 p-4 bg-background rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-3">Jogadores ({players.length})</p>
                  <div className="space-y-2">
                    {players.map((player, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-card rounded">
                        <span className="font-medium">{player.name}</span>
                        <Button
                          onClick={() => removePlayer(idx)}
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10"
                          size="sm"
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg mb-6">
                <p className="text-sm text-muted-foreground">
                  ℹ️ Mínimo 4 jogadores para começar
                </p>
              </div>

              <Button
                onClick={startGame}
                disabled={players.length < 4}
                className="w-full bg-primary hover:bg-orange-600 text-white py-6 text-lg font-semibold disabled:opacity-50"
              >
                ▶️ Começar Jogo
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // CHOOSE THEME
  if (phase === 'chooseTheme') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border p-8">
              <h2 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: 'Playfair Display' }}>
                Escolhe o Tema
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TOPICS.map((topic, idx) => (
                  <Button
                    key={idx}
                    onClick={() => chooseTheme(topic)}
                    className="bg-primary hover:bg-orange-600 text-white py-6 text-left justify-start h-auto"
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // PICK STAR
  if (phase === 'pickStar') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <Card className="bg-card border-border p-8 text-center">
              <div className="text-6xl mb-6">⭐</div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display' }}>
                Tema
              </h2>
              <p className="text-xl text-primary font-semibold mb-8">{selectedTopic}</p>
              <Button
                onClick={pickStar}
                className="w-full bg-primary hover:bg-orange-600 text-white py-6 text-lg font-semibold"
              >
                Continuar
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // SHOW ROLES
  if (phase === 'showRoles') {
    const currentRole = roles[roleIndex];

    if (!currentRole) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <div className="container">
            <div className="max-w-md mx-auto">
              <Card className="bg-card border-border p-8 text-center">
                <p className="text-gray-400">Carregando papéis...</p>
              </Card>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <Card className="bg-card border-border p-8 text-center">
              {!roleRevealed ? (
                <>
                  <h3 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }}>
                    {currentRole.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">Papel {roleIndex + 1} de {roles.length}</p>
                  <Button
                    onClick={() => setRoleRevealed(true)}
                    className="w-full bg-primary hover:bg-orange-600 text-white py-6 text-lg font-semibold"
                  >
                    Ver Papel
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display' }}>
                    {currentRole.name}
                  </h3>
                  <div className="text-6xl mb-4">{currentRole.role.split(' ')[0]}</div>
                  <h2 className="text-3xl font-bold text-primary mb-4">{currentRole.role}</h2>
                  <p className="text-gray-300 mb-8">{ROLE_DESCRIPTIONS[currentRole.role]}</p>
                  <Button
                    onClick={revealNextRole}
                    className="w-full bg-primary hover:bg-orange-600 text-white py-6 text-lg font-semibold"
                  >
                    {roleIndex < roles.length - 1 ? 'Passar' : 'Começar Discussão'}
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // DISCUSSION
  if (phase === 'discussion') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <Card className="bg-card border-border p-8 text-center">
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }}>
                Discussão
              </h2>
              <p className="text-xl text-muted-foreground mb-8">Tema: {selectedTopic}</p>
              <p className="text-lg mb-8">Comecem a discutir! 😄</p>
              <Button
                onClick={startVoting}
                className="w-full bg-primary hover:bg-orange-600 text-white py-6 text-lg font-semibold"
              >
                ▶️ Ir Votar
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // VOTING
  if (phase === 'voting') {
    const currentVoter = players[voteIndex];

    if (!currentVoter) {
      return null;
    }

    if (!selectedTarget) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-card border-border p-8">
                <h3 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Playfair Display' }}>
                  {currentVoter.name}, escolhe alguém
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {players.map((player, idx) => (
                    <Button
                      key={idx}
                      onClick={() => setSelectedTarget(player.name)}
                      className="bg-primary hover:bg-orange-600 text-white py-6"
                    >
                      {player.name}
                    </Button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <Card className="bg-card border-border p-8 text-center">
              <h3 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Playfair Display' }}>
                {currentVoter.name} acha que {selectedTarget} é...
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={() => saveVote(selectedTarget, '🕵️ Ladrão')}
                  className="w-full bg-primary hover:bg-orange-600 text-white py-6"
                >
                  🕵️ Ladrão
                </Button>
                <Button
                  onClick={() => saveVote(selectedTarget, '🚓 Polícia')}
                  className="w-full bg-primary hover:bg-orange-600 text-white py-6"
                >
                  🚓 Polícia
                </Button>
                <Button
                  onClick={() => saveVote(selectedTarget, '⚖️ Advogado')}
                  className="w-full bg-primary hover:bg-orange-600 text-white py-6"
                >
                  ⚖️ Advogado
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS
  if (phase === 'results') {
    const ranking = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border p-8">
              <h2 className="text-4xl font-bold mb-8 text-center text-primary" style={{ fontFamily: 'Playfair Display' }}>
                🏆 Resultados
              </h2>

              <div className="mb-8 p-6 bg-background rounded-lg border border-border">
                <h3 className="text-2xl font-bold mb-4 text-center" style={{ fontFamily: 'Playfair Display' }}>
                  Papéis Revelados
                </h3>
                <div className="space-y-2">
                  {roles.map((role, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-card rounded">
                      <span className="font-semibold">{role.name}</span>
                      <span className="text-lg">{role.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 p-6 bg-background rounded-lg border border-border">
                <h3 className="text-2xl font-bold mb-4 text-center" style={{ fontFamily: 'Playfair Display' }}>
                  Ranking
                </h3>
                <div className="space-y-2">
                  {ranking.map((entry, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-card rounded">
                      <span className="font-semibold">
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`} {entry[0]}
                      </span>
                      <span className="text-lg font-bold text-primary">{entry[1]} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={resetGame}
                className="w-full bg-primary hover:bg-orange-600 text-white py-6 text-lg font-semibold"
              >
                🔄 Recomeçar
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
