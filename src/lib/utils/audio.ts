/**
 * Plays synthesised audio feedback for web accessibility using browser's Web Audio API.
 * Requires no external audio assets and executes safely on modern browsers.
 */
export const playAudioFeedback = (type: "thinking" | "success" | "error"): void => {
  if (typeof window === "undefined") return;

  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "thinking") {
      // Soft single lower chime (C4)
      osc.type = "sine";
      osc.frequency.setValueAtTime(261.63, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === "success") {
      // High-pitched friendly ascending double chime (C5 -> E5)
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.setValueAtTime(0.12, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === "error") {
      // Low buzz (B2)
      osc.type = "triangle";
      osc.frequency.setValueAtTime(116.54, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (err) {
    console.error("Audio feedback playback failed:", err);
  }
};
