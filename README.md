# Await - Widget Workshop

Await is a widget workshop for people who like crafting small things. 

Start from templates or from scratch — arrange layouts, try out interactions, and tune the style with panels. Turn your ideas into home screen widgets, with a bit of your own taste.

Await is local-first. Your widgets and data stay with you.

This repository provides the public Await Widget Skill and widget template used to create Await widgets.

## Links

- [Privacy Policy](PRIVACY.md)
- [Skill Instructions](SKILL.md)
- [Template Project](assets/)
- [Feedback](https://github.com/maundytime/Await-Widget-Skill/issues)

## Await Widget Skill

This is an installable skill and template repo for AI agents to create Await widgets.

## Install As A Skill

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
git clone https://github.com/maundytime/Await-Widget-Skill.git "${CODEX_HOME:-$HOME/.codex}/skills/await-widget-skill"
```

Restart Codex after installing.

## Clone

```bash
git clone https://github.com/maundytime/Await-Widget-Skill.git
cd Await-Widget-Skill
cd assets
npm install
npm test
```

## Use With AI Agent

```text
Read `SKILL.md` first and follow it strictly.
Then implement or modify the target widget based on my request.
```

`SKILL.md` is the main instruction file for agents in this repo.
`assets/` is the template project root.
