/**
 * GameContainer - Componente Principal do Jogo "Jogo de Máscaras"
 * Design: Teatralismo Dramático - Preto + Laranja + Ouro
 * Tipografia: Playfair Display (títulos) + Inter (corpo)
 * Sistema de Papéis: Debate (Defensor, Contestador, Mediador, Infiltrado)
 * Mecânica: Verdade Secreta - O Defensor defende uma verdade, o Contestador questiona, o Mediador sabe a verdade
 * Melhorias: Defensor escolhe tema, Ranking persistente com localStorage
 */

import { useState, useEffect } from 'react';
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

type GamePhase = 'setup' | 'defensorChoosesTheme' | 'chooseAnswer' | 'showRoles' | 'discussion' | 'voting' | 'results';

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

// Carregar dados do localStorage
const loadScoresFromStorage = () => {
  try {
    const stored = localStorage.getItem('jogoMascarasScores');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const loadPlayersFromStorage = () => {
  try {
    const stored = localStorage.getItem('jogoMascarasPlayers');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Guardar dados no localStorage
const saveScoresToStorage = (scores: { [key: string]: number }) => {
  localStorage.setItem('jogoMascarasScores', JSON.stringify(scores));
};

const savePlayersToStorage = (players: Player[]) => {
  localStorage.setItem('jogoMascarasPlayers', JSON.stringify(players));
};

export default function GameContainer() {
  const { playApplause, playBoo, playVoteConfirm } = useSoundEffects();

  // Estados principais
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [players, setPlayers] = useState<Player[]>(() => loadPlayersFromStorage());
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [secretAnswer, setSecretAnswer] = useState<'SIM' | 'NÃO' | ''>('');
  const [defensor, setDefensor] = useState('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>(() => loadScoresFromStorage());
  
  // Estados para mostrar papéis
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleRevealed, setRoleRevealed] = useState(false);
  
  // Estados para votação
  const [votes, setVotes] = useState<Array<{ voter: string; target: string; role: string }>>([]);
  const [voteIndex, setVoteIndex] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState('');

  // Guardar scores quando mudam
  useEffect(() => {
    saveScoresToStorage(scores);
  }, [scores]);

  // Guardar players quando mudam
  useEffect(() => {
    savePlayersToStorage(players);
  }, [players]);

  // Adicionar jogador
  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 10) {
      const newPlayer = { name: newPlayerName.trim() };
      setPlayers([...players, newPlayer]);
      // Se o jogador não tem score, inicializar com 0
      if (!scores[newPlayerName.trim()]) {
        setScores({ ...scores, [newPlayerName.trim()]: 0 });
      }
      setNewPlayerName('');
    }
  };

  // Remover jogador
  const removePlayer = (index: number) => {
    const removed = players[index];
    setPlayers(players.filter((_, i) => i !== index));
    // Manter o score do jogador removido (para histórico)
  };

  // Começar jogo - escolher Defensor aleatoriamente
  const startGame = () => {
    if (players.length < 4) {
      alert('Mínimo 4 jogadores para começar');
      return;
    }
    // Escolher Defensor aleatoriamente
    const randomIndex = Math.floor(Math.random() * players.length);
    const randomDefensor = players[randomIndex].name;
    setDefensor(randomDefensor);
    setPhase('defensorChoosesTheme');
  };

  // Defensor escolhe tema
  const defensorChoosesTheme = (topic: string) => {
    setSelectedTopic(topic);
    setPhase('chooseAnswer');
  };

  // Escolher resposta secreta
  const chooseAnswer = (answer: 'SIM' | 'NÃO') => {
    setSecretAnswer(answer);
    assignRoles();
  };

  // Atribuir papéis
  const assignRoles = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    const newRoles: Role[] = [];
    
    // Defensor recebe a verdade secreta
    newRoles.push({
      name: defensor,
      role: '🎤 Defensor'
    });
    
    // Mediador (sabe a verdade)
    const mediadorIdx = shuffled.findIndex(p => p.name !== defensor);
    if (mediadorIdx !== -1) {
      newRoles.push({
        name: shuffled[mediadorIdx].name,
        role: '🤐 Mediador'
      });
    }
    
    // Contestador e Infiltrado (outros dois)
    const remaining = shuffled.filter(p => p.name !== defensor && !newRoles.some(r => r.name === p.name));
    if (remaining.length >= 2) {
      newRoles.push({
        name: remaining[0].name,
        role: '🎤 Contestador'
      });
      newRoles.push({
        name: remaining[1].name,
        role: '🎭 Infiltrado'
      });
    }
    
    setRoles(newRoles);
    setPhase('showRoles');
    setRoleIndex(0);
    setRoleRevealed(false);
  };

  // Revelar papel
  const revealRole = () => {
    setRoleRevealed(true);
  };

  // Passar para próximo papel
  const nextRole = () => {
    if (roleIndex < roles.length - 1) {
      setRoleIndex(roleIndex + 1);
      setRoleRevealed(false);
    } else {
      setPhase('discussion');
      setRoleIndex(0);
      setRoleRevealed(false);
    }
  };

  // Começar votação
  const startVoting = () => {
    setPhase('voting');
    setVoteIndex(0);
    setSelectedTarget('');
    setVotes([]);
  };

  // Guardar voto
  const saveVote = (target: string) => {
    playVoteConfirm();
    const voter = roles[voteIndex];
    const newVotes = [...votes, { voter: voter.name, target, role: voter.role }];
    setVotes(newVotes);
    
    if (voteIndex < roles.length - 1) {
      setVoteIndex(voteIndex + 1);
      setSelectedTarget('');
    } else {
      calculateResults(newVotes);
    }
  };

  // Calcular resultados
  const calculateResults = (finalVotes: Array<{ voter: string; target: string; role: string }>) => {
    const newScores = { ...scores };
    
    // Inicializar scores se necessário
    players.forEach(p => {
      if (!newScores[p.name]) {
        newScores[p.name] = 0;
      }
    });

    // Contar votos para cada jogador
    const voteCounts: { [key: string]: number } = {};
    finalVotes.forEach(vote => {
      voteCounts[vote.target] = (voteCounts[vote.target] || 0) + 1;
    });

    // Determinar quem foi mais votado
    const mostVoted = Object.entries(voteCounts).sort(([, a], [, b]) => b - a)[0];
    
    if (mostVoted) {
      const targetName = mostVoted[0];
      const targetRole = roles.find(r => r.name === targetName)?.role || '';
      
      // Se o mais votado é o Infiltrado, todos ganham pontos
      if (targetRole === '🎭 Infiltrado') {
        finalVotes.forEach(vote => {
          if (vote.voter !== targetName) {
            newScores[vote.voter] = (newScores[vote.voter] || 0) + 1;
            playApplause();
          }
        });
      } else {
        // Se não é o Infiltrado, o Infiltrado ganha pontos
        const infiltrado = roles.find(r => r.role === '🎭 Infiltrado');
        if (infiltrado) {
          newScores[infiltrado.name] = (newScores[infiltrado.name] || 0) + 2;
          playApplause();
        } else {
          playBoo();
        }
      }
    }

    // Bónus para Infiltrado não descoberto
    roles.forEach(roleObj => {
      if (roleObj.role === '🎭 Infiltrado') {
        const wasVotedFor = finalVotes.some(v => v.target === roleObj.name);
        if (!wasVotedFor) {
          newScores[roleObj.name] = (newScores[roleObj.name] || 0) + 1;
        }
      }
    });

    setScores(newScores);
    setPhase('results');
  };

  // Recomeçar jogo
  const restartGame = () => {
    setPhase('setup');
    setSelectedTopic('');
    setSecretAnswer('');
    setDefensor('');
    setRoles([]);
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

              <div className="flex flex-col gap-2 mb-6 w-full">
                <input
                  type="text"
                  placeholder="Nome do jogador..."
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                />
                <Button onClick={addPlayer} className="w-full bg-orange-500 hover:bg-orange-600">
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
                          variant="destructive"
                          size="sm"
                          className="text-xs"
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mostrar Ranking */}
              {Object.keys(scores).length > 0 && (
                <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <p className="text-sm font-bold text-orange-400 mb-3">🏆 Ranking Geral</p>
                  <div className="space-y-2">
                    {Object.entries(scores)
                      .sort(([, a], [, b]) => b - a)
                      .map(([name, score], idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span>{idx + 1}. {name}</span>
                          <span className="font-bold text-orange-400">{score} pts</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={startGame}
                  disabled={players.length < 4}
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  ▶️ Começar Jogo
                </Button>
              </div>

              {players.length < 4 && (
                <p className="mt-4 p-3 bg-orange-500/20 border border-orange-500/50 rounded text-sm text-orange-300">
                  ℹ️ Mínimo 4 jogadores para começar
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  }



  // DEFENSOR CHOOSES THEME
  if (phase === 'defensorChoosesTheme') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-2xl w-full">
          <h2 className="text-4xl font-bold mb-2 text-center" style={{ fontFamily: 'Playfair Display' }}>
            {defensor}, Escolhe o Tema
          </h2>
          <p className="text-center text-orange-400 mb-8 text-sm">Tu és o Defensor! 🎤</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {TOPICS.map((topic, idx) => (
              <Button
                key={idx}
                onClick={() => defensorChoosesTheme(topic)}
                className="bg-orange-500 hover:bg-orange-600 text-white p-4 h-auto text-left whitespace-normal break-words"
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
            {defensor}, escolhe a verdade secreta que vais defender:
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => chooseAnswer('SIM')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-6"
            >
              ✓ SIM
            </Button>
            <Button
              onClick={() => chooseAnswer('NÃO')}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-6"
            >
              ✗ NÃO
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // SHOW ROLES
  if (phase === 'showRoles') {
    const currentRole = roles[roleIndex];
    if (!currentRole) return null;

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display' }}>
            {currentRole.name}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Papel {roleIndex + 1} de {roles.length}</p>

          {!roleRevealed ? (
            <div className="mb-6">
              <div className="text-6xl mb-4">🎭</div>
              <Button onClick={revealRole} className="w-full bg-orange-500 hover:bg-orange-600">
                Ver Papel
              </Button>
            </div>
          ) : (
            <div className="mb-6 p-4 border-2 border-orange-500 rounded-lg bg-background">
              <p className="text-2xl font-bold text-orange-400 mb-3">{currentRole.role}</p>
              <p className="text-sm text-foreground mb-3">
                {ROLE_DESCRIPTIONS[currentRole.role]}
              </p>
              {currentRole.role === '🎤 Defensor' && (
                <p className="text-lg font-bold text-green-400">
                  Verdade Secreta: {secretAnswer}
                </p>
              )}
              {currentRole.role === '🤐 Mediador' && (
                <p className="text-lg font-bold text-blue-400">
                  Verdade Secreta: {secretAnswer}
                </p>
              )}
            </div>
          )}

          <Button onClick={nextRole} className="w-full bg-orange-500 hover:bg-orange-600">
            {roleIndex < roles.length - 1 ? 'Passar' : 'Começar Discussão'}
          </Button>
        </Card>
      </div>
    );
  }

  // DISCUSSION
  if (phase === 'discussion') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-2xl w-full text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }}>
            💬 Fase de Discussão
          </h2>
          <p className="text-xl text-orange-400 mb-4">{selectedTopic}</p>
          <p className="text-muted-foreground mb-8">
            Debatam! O Defensor defende a verdade, o Contestador questiona, o Mediador observa, e o Infiltrado engana!
          </p>
          <Button
            onClick={startVoting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
          >
            ▶️ Ir Votar
          </Button>
        </Card>
      </div>
    );
  }

  // VOTING
  if (phase === 'voting') {
    const currentVoter = roles[voteIndex];
    if (!currentVoter) return null;

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-bold mb-2 text-center" style={{ fontFamily: 'Playfair Display' }}>
            {currentVoter.name}, em quem votas?
          </h2>
          <p className="text-center text-muted-foreground mb-6">Voto {voteIndex + 1} de {roles.length}</p>

          {!selectedTarget ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {roles
                .filter(r => r.name !== currentVoter.name)
                .map((role, idx) => (
                  <Button
                    key={idx}
                    onClick={() => setSelectedTarget(role.name)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-4 h-auto"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-bold">{role.name}</span>
                      <span className="text-xs opacity-90">{role.role}</span>
                    </div>
                  </Button>
                ))}
            </div>
          ) : (
            <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
              <p className="text-lg font-bold text-blue-400">Votaste em:</p>
              <p className="text-base font-bold text-blue-300 mt-2">{selectedTarget}</p>
              <p className="text-sm text-blue-300/80 mt-1">{roles.find(r => r.name === selectedTarget)?.role}</p>
            </div>
          )}

          <Button
            onClick={() => saveVote(selectedTarget)}
            disabled={!selectedTarget}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
          >
            ✓ Confirmar Voto
          </Button>
        </Card>
      </div>
    );
  }

  // RESULTS
  if (phase === 'results') {
    const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-2xl w-full">
          <h2 className="text-4xl font-bold mb-8 text-center text-orange-400" style={{ fontFamily: 'Playfair Display' }}>
            🏆 Resultados
          </h2>

          <div className="mb-8 space-y-3">
            {sortedScores.map(([name, score], idx) => {
              const role = roles.find(r => r.name === name);
              return (
                <div key={idx} className="p-4 bg-background rounded-lg border border-border flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">{idx + 1}. {name}</p>
                    <p className="text-sm text-muted-foreground">{role?.role}</p>
                  </div>
                  <p className="text-2xl font-bold text-orange-400">{score} pts</p>
                </div>
              );
            })}
          </div>

          <Button
            onClick={restartGame}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
          >
            ▶️ Próximo Jogo
          </Button>
        </Card>
      </div>
    );
  }

  return null;
}
