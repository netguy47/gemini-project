# Windsurf Prompt: Alternate History Generator

You are an AI coding assistant working in the **Windsurf** IDE. Build a Node/Next.js application called **Alternate History Generator** for the "Alternate History Society" (three administrator users overseeing all generations).

## Core Algorithm
Implement the **What-If Generation Equation**:

```
W = f(S, E, T, G, C, I, P, K, R, D)
```

For each factor F:
1. Compute `Δ_i(F)` – how F shifts baseline reality.
2. Compute `S_i(F)` – cascading social, economic, or policy effects.
3. Compute `V_i(F)` – variations in traditions or language.

Then evaluate combined effects `C_j(F1, F2, ..., Fn)` between factors.

## Required Features
1. **Prompt Input** – UI for entering or selecting values for the ten factors.
2. **Generation** – Produce a text-only table of isolated impacts and combined effects using the algorithm.
3. **Persistence** – Save prompts and generated stories to a durable store (local JSON or database).
4. **News Log** – Each story is appended to a chronological log.
5. **Natural Language TTS** – Provide text-to-speech playback for each story.
6. **Conversational AI** – Chat interface allowing users to discuss generated stories.
7. **Progenitor Oversight** – Three admin accounts (the Alternate History Society) can approve or remove entries.
8. **Export** – Users can download saved stories and prompts (text or JSON).

## Guidelines
- All interaction is textual; no images or video.
- Use modern JavaScript/TypeScript with Next.js.
- Include modular code for easy integration with other applications.

