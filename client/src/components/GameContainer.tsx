/**
 * GameContainer - Componente Principal do Jogo "Rouba a Cena"
 * Design: Teatralismo Dramático - Preto + Laranja + Ouro
 * Tipografia: Playfair Display (títulos) + Inter (corpo)
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Play, Trophy, RotateCcw } from 'lucide-react';

interface Player {
  name: string;
  score: number;
}

interface Role {
  name: string;
  role: string;
  description: string;
}

type GamePhase = 'setup' | 'chooseTheme' | 'pickStar' | 'showRoles' | 'discussion' | 'voting' | 'results';

const ROLES = {
  '🚓 Polícia': 'Descobre quem são os ladrões sem te expor.',
  '🕶️ Agente Secreto': 'Ajuda a polícia em segredo.',
  '⚖️ Advogado': 'Protege os ladrões e confunde o grupo.',
  '🕵️ Ladrão': 'Engana todos e tenta não ser descoberto.'
};

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

export default function GameContainer() {
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [star, setStar] = useState('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [votes, setVotes] = useState<Array<{ voter: string; target: string; role: string }>>([]);
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [selectedVoteTarget, setSelectedVoteTarget] = useState('');
  const [selectedVoteRole, setSelectedVoteRole] = useState('');

  // Adicionar jogador
  const addPlayer = () => {
    if (newPlayerName.trim()) {
      setPlayers([...players, { name: newPlayerName.trim(), score: 0 }]);
      setNewPlayerName('');
    }
  };

  // Remover jogador
  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  // Começar jogo
  const startGame = () => {
    if (players.length < 4) {
      alert('Mínimo 4 jogadores!');
      return;
    }
    setPhase('chooseTheme');
  };

  // Escolher tema
  const selectTheme = (topic: string) => {
    setSelectedTopic(topic);
    setPhase('pickStar');
  };

  // Escolher estrela
  const pickStar = () => {
    const randomStar = players[Math.floor(Math.random() * players.length)];
    setStar(randomStar.name);
    // Chamar assignRoles diretamente
    setTimeout(() => {
      assignRoles();
    }, 0);
  };

  // Atribuir papéis (chamado diretamente de pickStar)
  const assignRoles = () => {
    const others = players
      .filter(p => p.name !== star)
      .sort(() => 0.5 - Math.random());

    const newRoles: Role[] = [];

    if (players.length === 4) {
      newRoles.push({ name: others[0].name, role: '🚓 Polícia', description: ROLES['🚓 Polícia'] });
      newRoles.push({ name: others[1].name, role: '⚖️ Advogado', description: ROLES['⚖️ Advogado'] });
      newRoles.push({ name: others[2].name, role: '🕵️ Ladrão', description: ROLES['🕵️ Ladrão'] });
    } else {
      newRoles.push({ name: others[0].name, role: '🚓 Polícia', description: ROLES['🚓 Polícia'] });
      newRoles.push({ name: others[1].name, role: '🕶️ Agente Secreto', description: ROLES['🕶️ Agente Secreto'] });
      newRoles.push({ name: others[2].name, role: '⚖️ Advogado', description: ROLES['⚖️ Advogado'] });
      for (let i = 3; i < others.length; i++) {
        newRoles.push({ name: others[i].name, role: '🕵️ Ladrão', description: ROLES['🕵️ Ladrão'] });
      }
    }

    setRoles(newRoles);
    setCurrentRoleIndex(0);
    setPhase('showRoles');
  };

  // Revelar próximo papel
  const revealNextRole = () => {
    if (currentRoleIndex < roles.length - 1) {
      setCurrentRoleIndex(currentRoleIndex + 1);
    } else {
      setPhase('discussion');
    }
  };

  // Começar votação
  const startVoting = () => {
    setVotes([]);
    setCurrentVoterIndex(0);
    setSelectedVoteTarget('');
    setSelectedVoteRole('');
    setPhase('voting');
  };

  // Salvar voto
  const saveVote = () => {
    if (!selectedVoteTarget || !selectedVoteRole) return;

    const voter = players[currentVoterIndex];
    setVotes([...votes, { voter: voter.name, target: selectedVoteTarget, role: selectedVoteRole }]);

    if (currentVoterIndex < players.length - 1) {
      setCurrentVoterIndex(currentVoterIndex + 1);
      setSelectedVoteTarget('');
      setSelectedVoteRole('');
    } else {
      calculateResults();
    }
  };

  // Calcular resultados
  const calculateResults = () => {
    const newScores: { [key: string]: number } = players.reduce((acc, p) => ({ ...acc, [p.name]: 0 }), {});

    votes.forEach(vote => {
      const realRole = roles.find(r => r.name === vote.target);
      if (realRole && realRole.role === vote.role) {
        newScores[vote.voter] = (newScores[vote.voter] || 0) + 2;
      }
    });

    const updatedPlayers = players.map(p => ({
      ...p,
      score: (p.score || 0) + (newScores[p.name] as number || 0)
    }));

    setPlayers(updatedPlayers);
    setPhase('results');
  };

  // Recomeçar jogo
  const resetGame = () => {
    setPhase('setup');
    setPlayers([]);
    setNewPlayerName('');
    setSelectedTopic('');
    setStar('');
    setRoles([]);
    setCurrentRoleIndex(0);
    setVotes([]);
    setCurrentVoterIndex(0);
  };

  // RENDER: Setup
  if (phase === 'setup') {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Hero Section */}
        <div
          className="relative w-full h-96 bg-cover bg-center flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663484958504/ZKVc5iR5iAuCBB8vZ3oe2g/hero-stage-spotlight-djyVKvkrksE4pswLtggHmr.webp)',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg mb-4">
              Rouba a Cena
            </h1>
            <p className="text-xl text-gray-200 drop-shadow">O jogo de papéis e engano</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 container py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">Adicionar Jogadores</h2>
              </div>

              {/* Input para novo jogador */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                  placeholder="Nome do jogador..."
                  className="flex-1 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  onClick={addPlayer}
                  className="bg-primary hover:bg-orange-600 text-white px-6"
                >
                  Adicionar
                </Button>
              </div>

              {/* Lista de jogadores */}
              {players.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-primary">Jogadores ({players.length})</h3>
                  <div className="space-y-2">
                    {players.map((player, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-background p-3 rounded-lg border border-border hover:border-primary transition"
                      >
                        <span className="font-medium">{player.name}</span>
                        <button
                          onClick={() => removePlayer(idx)}
                          className="text-destructive hover:text-red-400 transition text-sm"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requisito mínimo */}
              <div className="bg-background border border-border p-4 rounded-lg mb-6">
                <p className="text-sm text-muted-foreground">
                  ℹ️ Mínimo 4 jogadores para começar
                </p>
              </div>

              {/* Botão começar */}
              <Button
                onClick={startGame}
                disabled={players.length < 4}
                className="w-full bg-primary hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-6 text-lg font-semibold"
              >
                <Play className="w-5 h-5 mr-2" />
                Começar Jogo
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Escolher Tema
  if (phase === 'chooseTheme') {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border p-8">
              <h2 className="text-4xl font-bold mb-8 text-center">Escolhe o Tema</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TOPICS.map((topic, idx) => (
                  <Button
                    key={idx}
                    onClick={() => selectTheme(topic)}
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

  // RENDER: Escolher Estrela
  if (phase === 'pickStar') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <Card className="bg-card border-border p-8 text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h2 className="text-3xl font-bold mb-4">Tema</h2>
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

  // RENDER: Mostrar Papéis
  if (phase === 'showRoles') {
    if (!roles.length) {
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

    const currentRole = roles[currentRoleIndex];
    if (!currentRole) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <div className="container">
            <div className="max-w-md mx-auto">
              <Card className="bg-card border-border p-8 text-center">
                <p className="text-gray-400">Erro ao carregar papel</p>
              </Card>
            </div>
          </div>
        </div>
      );
    }

    const isRevealed = currentRoleIndex > 0 || false;

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <Card className="bg-card border-border p-8 text-center">
              {!isRevealed && currentRoleIndex === 0 ? (
                <>
                  <h3 className="text-2xl font-bold mb-6">{currentRole.name}</h3>
                  <Button
                    onClick={() => setCurrentRoleIndex(currentRoleIndex)}
                    className="w-full bg-primary hover:bg-orange-600 text-white py-6 text-lg font-semibold"
                  >
                    Ver Papel
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-4">{currentRole.name}</h3>
                  <div className="text-5xl mb-4">{currentRole.role.split(' ')[0]}</div>
                  <h2 className="text-3xl font-bold text-primary mb-4">{currentRole.role}</h2>
                  <p className="text-gray-300 mb-8">{currentRole.description}</p>
                  <Button
                    onClick={revealNextRole}
                    className="w-full bg-primary hover:bg-orange-600 text-white py-6 text-lg font-semibold"
                  >
                    {currentRoleIndex < roles.length - 1 ? 'Próximo' : 'Começar Discussão'}
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Discussão
  if (phase === 'discussion') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <Card className="bg-card border-border p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Discussão</h2>
              <p className="text-xl text-gray-300 mb-8">Tema: <span className="text-primary font-semibold">{selectedTopic}</span></p>
              <p className="text-gray-400 mb-8">Comecem a discussão! 🎭</p>
              <Button
                onClick={startVoting}
                className="w-full bg-primary hover:bg-orange-600 text-white py-6 text-lg font-semibold"
              >
                Ir Votar
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Votação
  if (phase === 'voting') {
    const voter = players[currentVoterIndex];

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">{voter.name}, escolhe alguém</h3>

              {/* Seleção de alvo */}
              {!selectedVoteTarget ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {players.map((player, idx) => (
                    <Button
                      key={idx}
                      onClick={() => setSelectedVoteTarget(player.name)}
                      className="bg-primary hover:bg-orange-600 text-white py-6 h-auto"
                    >
                      {player.name}
                    </Button>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-center text-lg mb-6">
                    <span className="text-primary font-semibold">{voter.name}</span> acha que <span className="text-primary font-semibold">{selectedVoteTarget}</span> é...
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(ROLES).map((role) => (
                      <Button
                        key={role}
                        onClick={() => setSelectedVoteRole(role)}
                        className="bg-secondary hover:bg-yellow-600 text-black py-6 h-auto"
                      >
                        {role}
                      </Button>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedVoteTarget('');
                      setSelectedVoteRole('');
                    }}
                    className="w-full mt-4 bg-muted hover:bg-gray-600 text-foreground py-3"
                  >
                    Voltar
                  </Button>
                  {selectedVoteRole && (
                    <Button
                      onClick={saveVote}
                      className="w-full mt-3 bg-primary hover:bg-orange-600 text-white py-6 text-lg font-semibold"
                    >
                      Confirmar Voto
                    </Button>
                  )}
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Resultados
  if (phase === 'results') {
    const ranking = [...players].sort((a, b) => b.score - a.score);

    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border p-8">
              <div className="flex items-center gap-3 mb-8">
                <Trophy className="w-8 h-8 text-secondary" />
                <h2 className="text-4xl font-bold">Resultados</h2>
              </div>

              {/* Papéis */}
              <div className="mb-8 p-4 bg-background rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-4 text-primary">Papéis</h3>
                <div className="space-y-2">
                  <p className="text-sm"><span className="font-semibold">⭐ Estrela:</span> {star}</p>
                  {roles.map((role, idx) => (
                    <p key={idx} className="text-sm">
                      <span className="font-semibold">{role.role}:</span> {role.name}
                    </p>
                  ))}
                </div>
              </div>

              {/* Ranking */}
              <h3 className="text-2xl font-bold mb-4">🏆 Ranking</h3>
              <div className="space-y-3 mb-8">
                {ranking.map((player, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-background p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-secondary">{idx + 1}.</span>
                      <span className="font-semibold">{player.name}</span>
                    </div>
                    <span className="text-xl font-bold text-primary">{player.score} pts</span>
                  </div>
                ))}
              </div>

              {/* Botão recomeçar */}
              <Button
                onClick={resetGame}
                className="w-full bg-primary hover:bg-orange-600 text-white py-6 text-lg font-semibold"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Recomeçar
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Fallback para fases não tratadas
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="container">
        <div className="max-w-md mx-auto">
          <Card className="bg-card border-border p-8 text-center">
            <p className="text-gray-400">Fase desconhecida: {phase}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
