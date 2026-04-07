/**
 * Hook para gerenciar efeitos sonoros do jogo "Rouba a Cena"
 * Fornece funções para tocar aplausos e vaias durante a votação
 */

import { useCallback } from 'react';

export function useSoundEffects() {
  // URLs de áudio livres de direitos (usando Web Audio API com dados inline)
  // Estes são sons curtos codificados em base64 para evitar requisições externas

  // Som de aplausos (gerado sinteticamente)
  const playApplause = useCallback(() => {
    try {
      // Criar contexto de áudio
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Criar osciladores para simular aplausos
      const now = audioContext.currentTime;
      const duration = 1.5;
      
      // Criar múltiplos sons para efeito de multidão
      for (let i = 0; i < 5; i++) {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        // Frequência aleatória para simular multidão
        osc.frequency.value = 200 + Math.random() * 300;
        osc.type = 'sine';
        
        // Envelope de volume
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
        
        osc.start(now + i * 0.1);
        osc.stop(now + duration + i * 0.1);
      }
      
      // Adicionar ruído branco para mais realismo
      const bufferSize = audioContext.sampleRate * duration;
      const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        noiseData[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = audioContext.createBufferSource();
      const noiseGain = audioContext.createGain();
      
      noiseSource.buffer = noiseBuffer;
      noiseSource.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      
      noiseGain.gain.setValueAtTime(0.05, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
      
      noiseSource.start(now);
      noiseSource.stop(now + duration);
    } catch (error) {
      console.warn('Erro ao reproduzir som de aplausos:', error);
    }
  }, []);

  // Som de vaias (boos)
  const playBoo = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const now = audioContext.currentTime;
      const duration = 1.2;
      
      // Criar sons graves para simular vaias
      for (let i = 0; i < 3; i++) {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        // Frequências mais graves
        osc.frequency.value = 80 + Math.random() * 120;
        osc.type = 'sine';
        
        // Envelope de volume
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.02, now + duration);
        
        osc.start(now + i * 0.15);
        osc.stop(now + duration + i * 0.15);
      }
      
      // Adicionar ruído para efeito de multidão desaprovadora
      const bufferSize = audioContext.sampleRate * duration;
      const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        noiseData[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = audioContext.createBufferSource();
      const noiseGain = audioContext.createGain();
      
      noiseSource.buffer = noiseBuffer;
      noiseSource.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      
      noiseGain.gain.setValueAtTime(0.08, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.02, now + duration);
      
      noiseSource.start(now);
      noiseSource.stop(now + duration);
    } catch (error) {
      console.warn('Erro ao reproduzir som de vaias:', error);
    }
  }, []);

  // Som de votação confirmada
  const playVoteConfirm = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const now = audioContext.currentTime;
      
      // Dois tons para efeito de "ding"
      const frequencies = [800, 1200];
      
      frequencies.forEach((freq, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.value = freq;
        osc.type = 'sine';
        
        const startTime = now + index * 0.1;
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
        
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch (error) {
      console.warn('Erro ao reproduzir som de confirmação:', error);
    }
  }, []);

  return {
    playApplause,
    playBoo,
    playVoteConfirm
  };
}
