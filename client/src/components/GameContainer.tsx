/**
 * GameContainer - Componente Principal do Jogo "Jogo de Máscaras"
 * Design: Teatralismo Dramático - Preto + Laranja + Ouro
 * Tipografia: Playfair Display (títulos) + Inter (corpo)
 * Sistema de Papéis: Debate (Defensor, Contestador, Mediador, Infiltrado)
 * Mecânica: Verdade Secreta - O Defensor defende uma verdade, o Contestador questiona, o Mediador sabe a verdade
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

type GamePhase = 'setup' | 'chooseTheme' | 'pickStar' | 'chooseAnswer' | 'showRoles' | 'discussion' | 'voting' | 'results';

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
  '🎤 Defensor': 'Defende a verdade secreta. Sabe qual é a resposta correta e deve defendê-la durante o debate.',
  '🎤 Contestador': 'Questiona tudo. Tenta descobrir quem está a mentir através de perguntas inteligentes.',
  '🤐 Mediador': 'Neutro e observador. Conhece a verdade secreta e vota com base na lógica.',
  '🎭 Infiltrado': 'O impostor! Finge ser Defensor mas defende o oposto da verdade. Engana todos!'
};

export default function GameContainer() {
  const { playApplause, playBoo, playVoteConfirm } = useSoundEffects();

  // Estados principais
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [secretAnswer, setSecretAnswer] = useState<'SIM' | 'NÃO' | ''>('');
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
    setPhase('chooseAnswer');
  };

  // Escolher a verdade secreta
  const chooseAnswer = (answer: 'SIM' | 'NÃO') => {
    setSecretAnswer(answer);
    setPhase('pickStar');
  };

  // Escolher estrela (Defensor)
  const pickStar = () => {
    const randomStar = players[Math.floor(Math.random() * players.length)];
    setStar(randomStar.name);
    assignRoles(randomStar.name);
  };

  // Atribuir papéis - Sistema Debate
  const assignRoles = (starName: string) => {
    const others = players
      .filter(p => p.name !== starName)
      .sort(() => 0.5 - Math.random());

    const newRoles: Role[] = [];

    if (players.length === 4) {
      // Sistema Debate: Defensor, Contestador, Mediador, Infiltrado
      newRoles.push({ name: starName, role: '🎤 Defensor' });
      newRoles.push({ name: others[0].name, role: '🎤 Contestador' });
      newRoles.push({ name: others[1].name, role: '🤐 Mediador' });
      newRoles.push({ name: others[2].name, role: '🎭 Infiltrado' });
    } else if (players.length === 5) {
      newRoles.push({ name: starName, role: '🎤 Defensor' });
      newRoles.push({ name: others[0].name, role: '🎤 Contestador' });
      newRoles.push({ name: others[1].name, role: '🤐 Mediador' });
      newRoles.push({ name: others[2].name, role: '🎭 Infiltrado' });
      newRoles.push({ name: others[3].name, role: '🎭 Infiltrado' });
    } else {
      newRoles.push({ name: starName, role: '🎤 Defensor' });
      newRoles.push({ name: others[0].name, role: '🎤 Contestador' });
      newRoles.push({ name: others[1].name, role: '🤐 Mediador' });
      for (let i = 2; i < others.length; i++) {
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
    setVoteIndex(0);
    setSelectedTarget('');
    setVotes([]);
    setPhase('voting');
  };

  // Salvar voto
  const saveVote = () => {
    if (!selectedTarget) return;
    
    playVoteConfirm();
    const currentVoter = players[voteIndex];
    const currentRole = roles.find(r => r.name === currentVoter.name)?.role || '';
    
    setVotes([...votes, { voter: currentVoter.name, target: selectedTarget, role: currentRole }]);
    
    if (voteIndex < players.length - 1) {
      setVoteIndex(voteIndex + 1);
      setSelectedTarget('');
    } else {
      calculateResults();
    }
  };

  // Calcular resultados
  const calculateResults = () => {
    const newScores = { ...scores };
    
    votes.forEach(vote => {
      const targetRole = roles.find(r => r.name === vote.target)?.role || '';
      const voterRole = vote.role;
      
      // Lógica de pontuação baseada na verdade secreta
      if (targetRole === '🎭 Infiltrado') {
        // Acertou em identificar o Infiltrado
        playApplause();
        newScores[vote.voter] = (newScores[vote.voter] || 0) + 1;
      } else if (targetRole === '🎤 Defensor' && voterRole === '🎭 Infiltrado') {
        // Infiltrado votou no Defensor (estratégia)
        playApplause();
        newScores[vote.voter] = (newScores[vote.voter] || 0) + 1;
      } else {
        // Erro
        playBoo();
      }
    });

    // Bónus para Infiltrado não descoberto
    roles.forEach(roleObj => {
      if (roleObj.role === '🎭 Infiltrado') {
        const wasVotedFor = votes.some(v => v.target === roleObj.name);
        if (!wasVotedFor) {
          newScores[roleObj.name] = (newScores[roleObj.name] || 0) + 2;
        }
      }
    });

    setScores(newScores);
    setPhase('results');
  };

  // Recomeçar jogo
  const restartGame = () => {
    setPhase('setup');
    setPlayers([]);
    setNewPlayerName('');
    setSelectedTopic('');
    setSecretAnswer('');
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
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                />
                <Button onClick={addPlayer} className="bg-orange-500 hover:bg-orange-600">
                  Adicionar
                </Button>
              </div>

              {players.length > 0 && (
                <div className="mb-6 p-4 bg-background rounded-lg">
                  <p className="text-sm text-muted-foreground mb-3">Jogadores ({players.length})</p>
                  <div className="space-y-2">
                    {players.map((player, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-card rounded border border-border">
                        <span>{player.name}</span>
                        <Button
                          onClick={() => removePlayer(idx)}
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:bg-red-500/10"
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6 p-3 bg-orange-500/20 border border-orange-500/50 rounded-lg text-sm">
                ℹ️ Mínimo 4 jogadores para começar
              </div>

              <Button
                onClick={startGame}
                disabled={players.length < 4}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 py-3 text-lg"
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
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-2xl w-full">
          <h2 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: 'Playfair Display' }}>
            Escolhe o Tema
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {TOPICS.map((topic, idx) => (
              <Button
                key={idx}
                onClick={() => chooseTheme(topic)}
                className="bg-orange-500 hover:bg-orange-600 text-white p-4 h-auto text-left"
              >
                {topic}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  // CHOOSE ANSWER (Verdade Secreta)
  if (phase === 'chooseAnswer') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }}>
            ⭐ Verdade Secreta
          </h2>
          <p className="text-xl text-orange-400 mb-8">{selectedTopic}</p>
          <p className="text-sm text-muted-foreground mb-6">
            Escolhe a verdade secreta que o Defensor vai defender:
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => chooseAnswer('SIM')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
            >
              ✅ SIM
            </Button>
            <Button
              onClick={() => chooseAnswer('NÃO')}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
            >
              ❌ NÃO
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // PICK STAR
  if (phase === 'pickStar') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }}>
            ⭐ Escolhendo Defensor...
          </h2>
          <p className="text-muted-foreground mb-8">O Defensor será escolhido aleatoriamente</p>
          <Button
            onClick={pickStar}
            className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg"
          >
            Continuar
          </Button>
        </Card>
      </div>
    );
  }

  // SHOW ROLES
  if (phase === 'showRoles' && roleIndex < roles.length) {
    const currentRole = roles[roleIndex];
    const roleDesc = ROLE_DESCRIPTIONS[currentRole.role] || '';

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display' }}>
            {currentRole.name}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Papel {roleIndex + 1} de {roles.length}
          </p>

          {!roleRevealed ? (
            <Button
              onClick={() => setRoleRevealed(true)}
              className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg mb-4"
            >
              Ver Papel
            </Button>
          ) : (
            <>
              <div className="mb-6 p-6 bg-background rounded-lg border-2 border-orange-500">
                <p className="text-4xl mb-3">{currentRole.role.split(' ')[0]}</p>
                <p className="text-2xl font-bold text-orange-400 mb-3">
                  {currentRole.role.split(' ').slice(1).join(' ')}
                </p>
                <p className="text-sm text-muted-foreground">{roleDesc}</p>
                {currentRole.role === '🎤 Defensor' && (
                  <p className="text-lg font-bold text-green-400 mt-4">
                    Verdade Secreta: {secretAnswer}
                  </p>
                )}
                {currentRole.role === '🤐 Mediador' && (
                  <p className="text-lg font-bold text-blue-400 mt-4">
                    Verdade Secreta: {secretAnswer}
                  </p>
                )}
              </div>
              <Button
                onClick={revealNextRole}
                className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg"
              >
                {roleIndex === roles.length - 1 ? 'Começar Discussão' : 'Passar'}
              </Button>
            </>
          )}
        </Card>
      </div>
    );
  }

  // DISCUSSION
  if (phase === 'discussion') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-2xl w-full">
          <h2 className="text-4xl font-bold mb-6 text-center" style={{ fontFamily: 'Playfair Display' }}>
            💬 Discussão
          </h2>
          <div className="mb-8 p-6 bg-background rounded-lg border border-border">
            <p className="text-xl text-orange-400 mb-4 font-bold">Tema:</p>
            <p className="text-2xl mb-6">{selectedTopic}</p>
            <p className="text-sm text-muted-foreground">
              O Defensor defende a verdade secreta. O Contestador questiona. O Mediador observa. O Infiltrado tenta enganar!
            </p>
          </div>
          <Button
            onClick={startVoting}
            className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg"
          >
            🗳️ Ir Votar
          </Button>
        </Card>
      </div>
    );
  }

  // VOTING
  if (phase === 'voting' && voteIndex < players.length) {
    const currentVoter = players[voteIndex];
    const otherPlayers = players.filter(p => p.name !== currentVoter.name);

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'Playfair Display' }}>
            {currentVoter.name}, escolhe alguém
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {otherPlayers.map((player, idx) => (
              <Button
                key={idx}
                onClick={() => setSelectedTarget(player.name)}
                className={`p-4 h-auto ${
                  selectedTarget === player.name
                    ? 'bg-orange-600 ring-2 ring-orange-400'
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
              >
                {player.name}
              </Button>
            ))}
          </div>
          <Button
            onClick={saveVote}
            disabled={!selectedTarget}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 py-3 text-lg"
          >
            ✓ Confirmar Voto
          </Button>
        </Card>
      </div>
    );
  }

  // RESULTS
  if (phase === 'results') {
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-2xl w-full">
          <h2 className="text-4xl font-bold mb-8 text-center text-orange-400" style={{ fontFamily: 'Playfair Display' }}>
            🏆 Resultados
          </h2>

          <div className="mb-8 p-6 bg-background rounded-lg border border-border">
            <p className="text-lg font-bold mb-4">Papéis Revelados:</p>
            <div className="space-y-2">
              {roles.map((role, idx) => (
                <p key={idx} className="text-sm">
                  <span className="font-bold">{role.name}</span> - {role.role}
                </p>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-lg font-bold mb-4">Ranking:</p>
            <div className="space-y-3">
              {sortedScores.map(([name, score], idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-background rounded border border-border">
                  <div>
                    <span className="text-2xl mr-3">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : ''}
                    </span>
                    <span className="font-bold">{name}</span>
                  </div>
                  <span className="text-orange-400 font-bold">{score} pts</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={restartGame}
            className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg"
          >
            🔄 Recomeçar
          </Button>
        </Card>
      </div>
    );
  }

  return null;
}
