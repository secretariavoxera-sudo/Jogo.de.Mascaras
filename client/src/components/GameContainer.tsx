/**
 * GameContainer - Componente Principal do Jogo "Jogo de Máscaras"
 * Design: Teatralismo Dramático - Preto + Laranja + Ouro
 * v2.0: Packs de Temas Profissionais, limite 4-6 jogadores, votação sem revelar papéis,
 *       Landing Page com botão "Ver Instruções", botões "Voltar Atrás" funcionais,
 *       Mediador vê o tema escolhido
 */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  THEME_PACKS,
  FREE_TOPICS_COUNT,
  type ThemePack,
} from "@/data/themePacks";

interface Player {
  name: string;
}

interface Role {
  name: string;
  role: string;
}

type GamePhase =
  | "landing"
  | "setup"
  | "selectPack"
  | "selectTopic"
  | "chooseAnswer"
  | "showRoles"
  | "discussion"
  | "voting"
  | "results";

const ROLE_DESCRIPTIONS: { [key: string]: string } = {
  "🎤 Defensor":
    "Defende a verdade secreta. Sabe qual é a resposta correta e deve defendê-la durante o debate.",
  "🎤 Contestador":
    "Questiona tudo. Tenta descobrir quem está a mentir através de perguntas inteligentes.",
  "🤐 Mediador":
    "Neutro e observador. Conhece a verdade secreta e vota com base na lógica.",
  "🎭 Infiltrado":
    "O impostor! Finge ser Defensor mas defende o oposto da verdade. Engana todos!",
};

const MIN_PLAYERS = 4;
const MAX_PLAYERS = 6;

const loadScoresFromStorage = (): { [key: string]: number } => {
  try {
    const stored = localStorage.getItem("jogoMascarasScores");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const loadPlayersFromStorage = (): Player[] => {
  try {
    const stored = localStorage.getItem("jogoMascarasPlayers");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveScoresToStorage = (scores: { [key: string]: number }) => {
  localStorage.setItem("jogoMascarasScores", JSON.stringify(scores));
};

const savePlayersToStorage = (players: Player[]) => {
  localStorage.setItem("jogoMascarasPlayers", JSON.stringify(players));
};

function InstructionsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="bg-card border-orange-500/50 p-8 max-w-2xl w-full my-4">
        <h2
          className="text-3xl font-bold mb-6 text-orange-400 text-center"
          style={{ fontFamily: "Playfair Display" }}
        >
          📖 Como Jogar
        </h2>
        <div className="space-y-4 text-sm text-foreground">
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="font-bold text-orange-400 mb-2">🎯 Objetivo</p>
            <p>
              Descobrir quem é o Infiltrado antes que ele engane toda a gente!
            </p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="font-bold text-orange-400 mb-2">👥 Jogadores</p>
            <p>
              De <strong>4 a 6 jogadores</strong>. Um deles será o Defensor
              (escolhido aleatoriamente).
            </p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="font-bold text-orange-400 mb-2">🎭 Os Papéis</p>
            <div className="space-y-2 mt-2">
              <p>
                <strong>🎤 Defensor</strong> — Escolhe o tema e a verdade
                secreta (SIM ou NÃO). Deve defendê-la.
              </p>
              <p>
                <strong>🎭 Infiltrado</strong> — Não sabe a verdade. Finge saber
                e tenta enganar todos.
              </p>
              <p>
                <strong>🎤 Contestador</strong> — Questiona e tenta descobrir
                quem mente.
              </p>
              <p>
                <strong>🤐 Mediador</strong> — Conhece a verdade secreta.
                Observa e vota com lógica.
              </p>
            </div>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="font-bold text-orange-400 mb-2">🔄 Fluxo do Jogo</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>O Defensor escolhe um Pack e um tema</li>
              <li>
                O Defensor escolhe a verdade secreta (SIM ou NÃO) — em privado
              </li>
              <li>Cada jogador recebe o seu papel em privado</li>
              <li>Debate aberto — todos discutem o tema</li>
              <li>Votação — cada jogador vota em quem acha ser o Infiltrado</li>
              <li>Resultados e pontuação</li>
            </ol>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="font-bold text-orange-400 mb-2">🏆 Pontuação</p>
            <p>
              Se o Infiltrado for descoberto, todos os outros ganham{" "}
              <strong>1 ponto</strong>.
            </p>
            <p className="mt-1">
              Se o Infiltrado escapar, ganha <strong>2 pontos</strong> +{" "}
              <strong>1 bónus</strong> se ninguém votou nele.
            </p>
          </div>
        </div>
        <Button
          onClick={onClose}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white"
        >
          ✓ Entendido!
        </Button>
      </Card>
    </div>
  );
}

export default function GameContainer() {
  const { playApplause, playBoo, playVoteConfirm } = useSoundEffects();

  const [phase, setPhase] = useState<GamePhase>("landing");
  const [players, setPlayers] = useState<Player[]>(() =>
    loadPlayersFromStorage()
  );
  const [newPlayerName, setNewPlayerName] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedPack, setSelectedPack] = useState<ThemePack | null>(null);
  const [secretAnswer, setSecretAnswer] = useState<"SIM" | "NÃO" | "">("");
  const [defensor, setDefensor] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>(() =>
    loadScoresFromStorage()
  );
  const [showInstructions, setShowInstructions] = useState(false);
  const [showAgeGate, setShowAgeGate] = useState(false);
  const [pendingAdultPack, setPendingAdultPack] = useState<ThemePack | null>(
    null
  );
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleRevealed, setRoleRevealed] = useState(false);
  const [votes, setVotes] = useState<
    Array<{ voter: string; target: string; role: string }>
  >([]);
  const [voteIndex, setVoteIndex] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState("");

  useEffect(() => {
    saveScoresToStorage(scores);
  }, [scores]);
  useEffect(() => {
    savePlayersToStorage(players);
  }, [players]);

  const addPlayer = () => {
    const name = newPlayerName.trim();
    if (!name) return;

    if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      alert("Este nome já está em uso! Escolha outro.");
      return;
    }

    if (players.length < MAX_PLAYERS) {
      const newPlayer = { name };
      setPlayers([...players, newPlayer]);
      if (!scores[name]) {
        setScores({ ...scores, [name]: 0 });
      }
      setNewPlayerName("");
    }
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const startGame = () => {
    if (players.length < MIN_PLAYERS || players.length > MAX_PLAYERS) return;
    const randomIndex = Math.floor(Math.random() * players.length);
    setDefensor(players[randomIndex].name);
    setPhase("selectPack");
  };

  const selectPack = (pack: ThemePack) => {
    if (pack.isAdult) {
      setPendingAdultPack(pack);
      setShowAgeGate(true);
    } else {
      setSelectedPack(pack);
      setPhase("selectTopic");
    }
  };
  const confirmAgeGate = () => {
    if (pendingAdultPack) {
      setSelectedPack(pendingAdultPack);
      setPhase("selectTopic");
    }
    setShowAgeGate(false);
    setPendingAdultPack(null);
  };
  const cancelAgeGate = () => {
    setShowAgeGate(false);
    setPendingAdultPack(null);
  };

  const selectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setPhase("chooseAnswer");
  };

  const chooseAnswer = (answer: "SIM" | "NÃO") => {
    setSecretAnswer(answer);
    assignRoles();
  };

  const assignRoles = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    const newRoles: Role[] = [];

    newRoles.push({ name: defensor, role: "🎤 Defensor" });

    const mediadorCandidate = shuffled.find(p => p.name !== defensor);
    if (mediadorCandidate) {
      newRoles.push({ name: mediadorCandidate.name, role: "🤐 Mediador" });
    }

    const remaining = shuffled.filter(
      p => !newRoles.some(r => r.name === p.name)
    );
    if (remaining.length > 0) {
      newRoles.push({ name: remaining[0].name, role: "🎭 Infiltrado" });
    }

    const contestadores = shuffled.filter(
      p => !newRoles.some(r => r.name === p.name)
    );
    contestadores.forEach(p => {
      newRoles.push({ name: p.name, role: "🎤 Contestador" });
    });

    const shuffledRoles = [...newRoles].sort(() => Math.random() - 0.5);
    setRoles(shuffledRoles);
    setPhase("showRoles");
    setRoleIndex(0);
    setRoleRevealed(false);
  };

  const revealRole = () => setRoleRevealed(true);

  const nextRole = () => {
    if (roleIndex < roles.length - 1) {
      setRoleIndex(roleIndex + 1);
      setRoleRevealed(false);
    } else {
      setPhase("discussion");
    }
  };

  const startVoting = () => {
    setPhase("voting");
    setVoteIndex(0);
    setSelectedTarget("");
    setVotes([]);
  };

  const saveVote = (target: string) => {
    playVoteConfirm();
    const voter = roles[voteIndex];
    const newVotes = [
      ...votes,
      { voter: voter.name, target, role: voter.role },
    ];
    setVotes(newVotes);
    if (voteIndex < roles.length - 1) {
      setVoteIndex(voteIndex + 1);
      setSelectedTarget("");
    } else {
      calculateResults(newVotes);
    }
  };

  const calculateResults = (
    finalVotes: Array<{ voter: string; target: string; role: string }>
  ) => {
    const newScores = { ...scores };
    players.forEach(p => {
      if (newScores[p.name] === undefined) newScores[p.name] = 0;
    });

    const voteCounts: { [key: string]: number } = {};
    finalVotes.forEach(vote => {
      voteCounts[vote.target] = (voteCounts[vote.target] || 0) + 1;
    });

    const sortedVoteCounts = Object.entries(voteCounts).sort(
      ([, a], [, b]) => b - a
    );
    const mostVoted = sortedVoteCounts[0];
    const secondMostVoted = sortedVoteCounts[1];

    const isTie = secondMostVoted && mostVoted[1] === secondMostVoted[1];

    if (mostVoted && !isTie) {
      const targetRole = roles.find(r => r.name === mostVoted[0])?.role || "";
      if (targetRole === "🎭 Infiltrado") {
        finalVotes.forEach(vote => {
          if (vote.voter !== mostVoted[0]) {
            newScores[vote.voter] = (newScores[vote.voter] || 0) + 1;
          }
        });
        playApplause();
      } else {
        const infiltrado = roles.find(r => r.role === "🎭 Infiltrado");
        if (infiltrado) {
          newScores[infiltrado.name] = (newScores[infiltrado.name] || 0) + 2;
          playBoo();
        }
      }
    } else {
      // Em caso de empate ou ninguém votado, o infiltrado escapa
      const infiltrado = roles.find(r => r.role === "🎭 Infiltrado");
      if (infiltrado) {
        newScores[infiltrado.name] = (newScores[infiltrado.name] || 0) + 2;
        playBoo();
      }
    }

    roles.forEach(roleObj => {
      if (roleObj.role === "🎭 Infiltrado") {
        const wasVotedFor = finalVotes.some(v => v.target === roleObj.name);
        if (!wasVotedFor) {
          newScores[roleObj.name] = (newScores[roleObj.name] || 0) + 1;
        }
      }
    });

    setScores(newScores);
    setPhase("results");
  };

  const resetRound = () => {
    setPhase("setup");
    setSelectedTopic("");
    setSelectedPack(null);
    setSecretAnswer("");
    setDefensor("");
    setRoles([]);
    setRoleIndex(0);
    setRoleRevealed(false);
    setVotes([]);
    setVoteIndex(0);
    setSelectedTarget("");
  };

  const goToLanding = () => {
    resetRound();
    setPhase("landing");
  };

  // ─── LANDING PAGE ─────────────────────────────────────────────────────────────
  if (phase === "landing") {
    return (
      <>
        {showInstructions && (
          <InstructionsModal onClose={() => setShowInstructions(false)} />
        )}
        <div
          className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4"
          style={{
            background:
              "linear-gradient(135deg, #0a0a0a 0%, rgba(255,107,53,0.08) 100%)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-16 left-8 text-9xl opacity-5 select-none">
              🎭
            </div>
            <div className="absolute bottom-16 right-8 text-9xl opacity-5 select-none">
              🎭
            </div>
          </div>
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <div className="text-7xl mb-6">🎭</div>
            <h1
              className="text-6xl md:text-7xl font-bold text-white mb-3"
              style={{ fontFamily: "Playfair Display" }}
            >
              Jogo de <span className="text-orange-400">Máscaras</span>
            </h1>
            <p className="text-xl text-orange-300 mb-2">
              Debate. Engano. Verdade.
            </p>
            <p className="text-muted-foreground mb-10 text-sm">
              Um jogo de dedução social para 4 a 6 jogadores
              <br />
              <span className="text-[10px] opacity-30 mt-2 block">v2.1.0</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button
                onClick={() => setPhase("setup")}
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-6 rounded-xl shadow-lg shadow-orange-500/20"
              >
                ▶️ Jogar Agora
              </Button>
              <Button
                onClick={() => setShowInstructions(true)}
                variant="outline"
                className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 text-lg px-10 py-6 rounded-xl"
              >
                📖 Ver Instruções
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(ROLE_DESCRIPTIONS).map(([role, desc]) => (
                <div
                  key={role}
                  className="p-3 bg-card/50 border border-border rounded-lg text-center"
                >
                  <p className="text-2xl mb-1">{role.split(" ")[0]}</p>
                  <p className="text-xs font-bold text-orange-400">
                    {role.split(" ").slice(1).join(" ")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {desc.split(".")[0]}.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ─── SETUP ────────────────────────────────────────────────────────────────────
  if (phase === "setup") {
    return (
      <>
        {showInstructions && (
          <InstructionsModal onClose={() => setShowInstructions(false)} />
        )}
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <div
            className="h-40 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,10,10,0.95), rgba(255,107,53,0.2))",
            }}
          >
            <div className="text-center">
              <h1
                className="text-4xl font-bold text-white"
                style={{ fontFamily: "Playfair Display" }}
              >
                Jogo de Máscaras
              </h1>
              <p className="text-orange-300 text-sm mt-1">
                Debate, Engano e Verdade
              </p>
            </div>
          </div>
          <div className="container py-8 flex-1">
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2 mb-4">
                <Button
                  onClick={goToLanding}
                  variant="outline"
                  className="border-border text-muted-foreground hover:text-foreground"
                >
                  ← Voltar Atrás
                </Button>
                <Button
                  onClick={() => setShowInstructions(true)}
                  variant="outline"
                  size="sm"
                  className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 ml-auto"
                >
                  📖 Ver Instruções
                </Button>
              </div>
              <Card className="bg-card border-border p-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">👥</span>
                  <h2
                    className="text-3xl font-bold"
                    style={{ fontFamily: "Playfair Display" }}
                  >
                    Jogadores
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Adiciona de {MIN_PLAYERS} a {MAX_PLAYERS} jogadores
                </p>

                {players.length < MAX_PLAYERS && (
                  <div className="flex flex-col gap-2 mb-6">
                    <input
                      type="text"
                      placeholder="Nome do jogador..."
                      value={newPlayerName}
                      onChange={e => setNewPlayerName(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && addPlayer()}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-orange-500"
                    />
                    <Button
                      onClick={addPlayer}
                      disabled={!newPlayerName.trim()}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      + Adicionar
                    </Button>
                  </div>
                )}

                {players.length > 0 && (
                  <div className="mb-6 p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">
                      Jogadores ({players.length}/{MAX_PLAYERS})
                    </p>
                    <div className="space-y-2">
                      {players.map((player, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center p-2 bg-card rounded border border-border"
                        >
                          <span className="font-medium">
                            {idx + 1}. {player.name}
                          </span>
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

                {Object.keys(scores).length > 0 && (
                  <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <p className="text-sm font-bold text-orange-400 mb-3">
                      🏆 Ranking Geral
                    </p>
                    <div className="space-y-2">
                      {Object.entries(scores)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([name, score], idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center text-sm"
                          >
                            <span>
                              {idx + 1}. {name}
                            </span>
                            <span className="font-bold text-orange-400">
                              {score} pts
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={startGame}
                  disabled={
                    players.length < MIN_PLAYERS || players.length > MAX_PLAYERS
                  }
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
                >
                  ▶️ Começar Jogo
                </Button>
                {players.length < MIN_PLAYERS && (
                  <p className="mt-4 p-3 bg-orange-500/20 border border-orange-500/50 rounded text-sm text-orange-300 text-center">
                    ℹ️ Precisas de pelo menos {MIN_PLAYERS} jogadores para
                    começar
                  </p>
                )}
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ─── SELECIONAR PACK ──────────────────────────────────────────────────────────
  if (phase === "selectPack") {
    return (
      <>
        {/* Age Gate Modal */}
        {showAgeGate && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <Card className="bg-card border-red-500/50 p-8 max-w-sm w-full text-center">
              <div className="text-5xl mb-4">🔞</div>
              <h2
                className="text-2xl font-bold mb-3 text-red-400"
                style={{ fontFamily: "Playfair Display" }}
              >
                Conteúdo +18
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                O <strong className="text-foreground">Pack Ousado</strong>{" "}
                contém temas de natureza adulta e atrevida. Confirmas que tens{" "}
                <strong className="text-red-400">18 anos ou mais</strong>?
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={cancelAgeGate}
                  variant="outline"
                  className="flex-1 border-border text-muted-foreground hover:text-foreground"
                >
                  ✗ Não, voltar
                </Button>
                <Button
                  onClick={confirmAgeGate}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  ✓ Tenho +18
                </Button>
              </div>
            </Card>
          </div>
        )}
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <Button
              onClick={() => setPhase("setup")}
              variant="outline"
              className="mb-4 border-border text-muted-foreground hover:text-foreground"
            >
              ← Voltar Atrás
            </Button>
            <Card className="bg-card border-border p-8">
              <h2
                className="text-4xl font-bold mb-2 text-center"
                style={{ fontFamily: "Playfair Display" }}
              >
                {defensor}, Escolhe o Pack
              </h2>
              <p className="text-center text-orange-400 mb-8 text-sm">
                Tu és o Defensor! 🎤 Escolhe a categoria de temas
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {THEME_PACKS.map(pack => (
                  <button
                    key={pack.id}
                    onClick={() => selectPack(pack)}
                    className={`p-5 rounded-xl border-2 ${pack.borderColor} bg-gradient-to-br ${pack.color} text-left transition-all hover:scale-105 hover:shadow-lg`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{pack.emoji}</span>
                      <div>
                        <p className="font-bold text-foreground text-lg">
                          {pack.name}
                        </p>
                        {pack.isAdult && (
                          <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">
                            🔞 +18
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {pack.description}
                    </p>
                    <p className="text-xs text-green-400 mt-2">
                      ✓ {pack.topics.length} temas disponíveis
                    </p>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  }

  // ─── SELECIONAR TEMA ──────────────────────────────────────────────────────────
  if (phase === "selectTopic" && selectedPack) {
    const allTopics = selectedPack.topics;
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <Button
            onClick={() => setPhase("selectPack")}
            variant="outline"
            className="mb-4 border-border text-muted-foreground hover:text-foreground"
          >
            ← Voltar Atrás
          </Button>
          <Card className="bg-card border-border p-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{selectedPack.emoji}</span>
              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "Playfair Display" }}
              >
                {selectedPack.name}
              </h2>
            </div>
            <p className="text-orange-400 mb-6 text-sm text-center">
              {defensor}, escolhe o tema do debate 🎤
            </p>
            <p className="text-xs text-green-400 font-bold mb-3 uppercase tracking-wider">
              ✓ {allTopics.length} Temas Disponíveis
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {allTopics.map((topic, idx) => {
                const isLocked = idx >= FREE_TOPICS_COUNT;
                return (
                  <Button
                    key={idx}
                    onClick={() => !isLocked && selectTopic(topic)}
                    disabled={isLocked}
                    className={`p-4 h-auto text-left whitespace-normal break-words leading-snug flex justify-between items-center ${
                      isLocked
                        ? "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed opacity-70"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                  >
                    <span>{topic}</span>
                    {isLocked && <span className="ml-2">🔒</span>}
                  </Button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ─── ESCOLHER RESPOSTA SECRETA ────────────────────────────────────────────────
  if (phase === "chooseAnswer") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Button
            onClick={() => setPhase("selectTopic")}
            variant="outline"
            className="mb-4 border-border text-muted-foreground hover:text-foreground"
          >
            ← Voltar Atrás
          </Button>
          <Card className="bg-card border-border p-8 text-center">
            <h2
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: "Playfair Display" }}
            >
              ⭐ Verdade Secreta
            </h2>
            <p className="text-xl text-orange-400 mb-4 font-medium">
              {selectedTopic}
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              {defensor}, escolhe a verdade secreta.{" "}
              <strong>Só tu e o Mediador saberão.</strong>
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => chooseAnswer("SIM")}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-8 rounded-xl"
              >
                ✓ SIM
              </Button>
              <Button
                onClick={() => chooseAnswer("NÃO")}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-8 rounded-xl"
              >
                ✗ NÃO
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ─── MOSTRAR PAPÉIS ───────────────────────────────────────────────────────────
  if (phase === "showRoles") {
    const currentRole = roles[roleIndex];
    if (!currentRole) return null;
    const isDefensorOrMediador =
      currentRole.role === "🎤 Defensor" || currentRole.role === "🤐 Mediador";
    const isInfiltrado = currentRole.role === "🎭 Infiltrado";
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-md w-full text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Papel {roleIndex + 1} de {roles.length}
          </p>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "Playfair Display" }}
          >
            {currentRole.name}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Passa o telemóvel a <strong>{currentRole.name}</strong> para ver o
            seu papel em privado.
          </p>
          {!roleRevealed ? (
            <div className="mb-6">
              <div className="text-7xl mb-6">🎭</div>
              <Button
                onClick={revealRole}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
              >
                👁️ Revelar Papel
              </Button>
            </div>
          ) : (
            <div className="mb-6">
              <div className="p-6 border-2 border-orange-500 rounded-xl bg-background mb-4">
                <p className="text-3xl font-bold text-orange-400 mb-3">
                  {currentRole.role}
                </p>
                <p className="text-sm text-foreground mb-4">
                  {ROLE_DESCRIPTIONS[currentRole.role]}
                </p>

                <div className="mt-3 p-3 bg-card rounded-lg border border-border text-left">
                  <p className="text-xs text-muted-foreground mb-1">
                    Tema em debate
                  </p>
                  <p className="text-sm font-medium text-foreground mb-2">
                    {selectedTopic}
                  </p>

                  {isDefensorOrMediador ? (
                    <>
                      <p className="text-xs text-muted-foreground mb-1">
                        Verdade Secreta
                      </p>
                      <p
                        className={`text-2xl font-bold ${secretAnswer === "SIM" ? "text-green-400" : "text-red-400"}`}
                      >
                        {secretAnswer}
                      </p>
                    </>
                  ) : isInfiltrado ? (
                    <div className="mt-2 p-2 bg-red-500/10 rounded border border-red-500/30">
                      <p className="text-xs text-red-400 font-medium">
                        ⚠️ Não sabes a verdade secreta! Finge que sabes e engana
                        todos.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-2 p-2 bg-blue-500/10 rounded border border-blue-500/30">
                      <p className="text-xs text-blue-400 font-medium">
                        🔍 Tenta descobrir qual é a verdade e quem está a
                        mentir.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <Button
                onClick={nextRole}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
              >
                {roleIndex < roles.length - 1
                  ? "→ Passar ao Seguinte"
                  : "🎬 Começar Debate"}
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // ─── DISCUSSÃO ────────────────────────────────────────────────────────────────
  if (phase === "discussion") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-2xl w-full text-center">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "Playfair Display" }}
          >
            💬 Fase de Debate
          </h2>
          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl mb-6">
            <p className="text-xs text-orange-400 uppercase tracking-wider mb-1">
              Tema em debate
            </p>
            <p className="text-xl font-bold text-foreground">{selectedTopic}</p>
          </div>
          <div className="text-left space-y-3 mb-8">
            <p className="text-sm text-muted-foreground">
              <strong className="text-orange-400">🎤 Defensor</strong> — Defende
              a verdade secreta com convicção.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-purple-400">🎭 Infiltrado</strong> — Finge
              saber a verdade. Engana todos!
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-blue-400">🎤 Contestador(es)</strong> —
              Questionam e tentam descobrir quem mente.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-cyan-400">🤐 Mediador</strong> — Observa e
              vota com base na lógica.
            </p>
          </div>
          <Button
            onClick={startVoting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
          >
            🗳️ Ir para Votação
          </Button>
        </Card>
      </div>
    );
  }

  // ─── VOTAÇÃO (sem revelar papéis) ─────────────────────────────────────────────
  if (phase === "voting") {
    const currentVoter = roles[voteIndex];
    if (!currentVoter) return null;
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-2xl w-full">
          <h2
            className="text-3xl font-bold mb-2 text-center"
            style={{ fontFamily: "Playfair Display" }}
          >
            {currentVoter.name}, em quem votas?
          </h2>
          <p className="text-center text-muted-foreground mb-2">
            Voto {voteIndex + 1} de {roles.length}
          </p>
          <p className="text-center text-xs text-orange-400 mb-6">
            Quem achas que é o Infiltrado?
          </p>
          {!selectedTarget ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {roles
                .filter(r => r.name !== currentVoter.name)
                .map((role, idx) => (
                  <Button
                    key={idx}
                    onClick={() => setSelectedTarget(role.name)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-5 h-auto text-lg font-bold"
                  >
                    {role.name}
                  </Button>
                ))}
            </div>
          ) : (
            <div className="mb-6 p-5 bg-blue-500/20 border border-blue-500/50 rounded-xl text-center">
              <p className="text-sm text-blue-400 mb-1">Vais votar em:</p>
              <p className="text-2xl font-bold text-blue-300">
                {selectedTarget}
              </p>
              <button
                onClick={() => setSelectedTarget("")}
                className="text-xs text-muted-foreground mt-2 underline"
              >
                Mudar voto
              </button>
            </div>
          )}
          <Button
            onClick={() => saveVote(selectedTarget)}
            disabled={!selectedTarget}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 disabled:opacity-50"
          >
            ✓ Confirmar Voto
          </Button>
        </Card>
      </div>
    );
  }

  // ─── RESULTADOS ───────────────────────────────────────────────────────────────
  if (phase === "results") {
    const sortedScores = Object.entries(scores)
      .filter(([name]) => players.some(p => p.name === name))
      .sort(([, a], [, b]) => b - a);
    const infiltrado = roles.find(r => r.role === "🎭 Infiltrado");
    const voteCounts: { [key: string]: number } = {};
    votes.forEach(v => {
      voteCounts[v.target] = (voteCounts[v.target] || 0) + 1;
    });
    const mostVoted = Object.entries(voteCounts).sort(
      ([, a], [, b]) => b - a
    )[0];
    const infiltradoFound =
      mostVoted && infiltrado && mostVoted[0] === infiltrado.name;
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border p-8 max-w-2xl w-full">
          <h2
            className="text-4xl font-bold mb-4 text-center text-orange-400"
            style={{ fontFamily: "Playfair Display" }}
          >
            🏆 Resultados
          </h2>
          <div
            className={`mb-6 p-4 rounded-xl border text-center ${infiltradoFound ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}
          >
            <p className="text-lg font-bold mb-1">
              {infiltradoFound
                ? "✅ Infiltrado Descoberto!"
                : "❌ O Infiltrado Escapou!"}
            </p>
            <p className="text-sm text-muted-foreground">
              O Infiltrado era:{" "}
              <strong className="text-orange-400">{infiltrado?.name}</strong>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Tema: <em>{selectedTopic}</em> — Verdade Secreta:{" "}
              <strong
                className={
                  secretAnswer === "SIM" ? "text-green-400" : "text-red-400"
                }
              >
                {secretAnswer}
              </strong>
            </p>
          </div>
          <div className="mb-6 space-y-3">
            {sortedScores.map(([name, score], idx) => {
              const role = roles.find(r => r.name === name);
              const isInfiltrado = role?.role === "🎭 Infiltrado";
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border flex justify-between items-center ${isInfiltrado ? "bg-purple-500/10 border-purple-500/30" : "bg-background border-border"}`}
                >
                  <div>
                    <p className="font-bold text-lg">
                      {idx + 1}. {name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {role?.role}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-orange-400">
                    {score} pts
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mb-6 p-4 bg-background rounded-lg border border-border">
            <p className="text-sm font-bold text-muted-foreground mb-3">
              🗳️ Votos desta ronda
            </p>
            <div className="space-y-1">
              {votes.map((vote, idx) => (
                <p key={idx} className="text-xs text-muted-foreground">
                  <strong>{vote.voter}</strong> votou em{" "}
                  <strong>{vote.target}</strong>
                </p>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={resetRound}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
            >
              ▶️ Próxima Ronda
            </Button>
            <Button
              onClick={goToLanding}
              variant="outline"
              className="border-border text-muted-foreground hover:text-foreground py-6 px-6"
            >
              🏠 Início
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return null;
}
