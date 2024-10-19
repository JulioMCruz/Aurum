<h1 align="center">AI Framework</h1>

<h4 align="center">
  <a href="https://ethglobal.com/">ETHGlobal</a> | <a href="https://ethglobal.com/">Website</a>
  <br><br>
  <span style="font-weight: 300; font-style: italic;">Note: Everything in blue is a clickable link.</span>
  <br>
  <span style="font-weight: 300; font-style: italic;">Please use Python Version 3.13.0 :)</span>
  <br><br>
  <img src="assets/logo.jpeg" alt="logo">
</h4>

---

## Environment Configuration (.env)

- [OPENAI_API_KEY](https://github.com/JulioMCruz/Aurum/blob/85d6ea4fbbf264d2b47d59f663f7b9e6b60ff7af/AiFramework/api.py#L12): Required for integrating OpenAI with the Swarm framework.

---

## Swarm Framework

We're using the **Swarm** library, released **last week**. You can explore the official repository [here](https://github.com/openai/swarm).

### How Swarm Works

Swarm is an experimental framework designed to orchestrate multiple agents working together in a lightweight, efficient way. Each agent is responsible for specific tasks and can hand off tasks to other agents when needed. It's ideal for complex AI workflows and easily customizable for educational purposes.

- **Agent-Based**: Each agent has its own instructions and tools, allowing you to split responsibilities.
- **Handoffs**: Agents can transfer tasks seamlessly between one another.
- **Stateless**: Swarm does not store state between calls, meaning each interaction is self-contained.
- **Tool Integration**: Functions can be tied to agents, allowing for dynamic and real-time processing.
<br><br>

<hr>

### Dependencies We Use

- **Swarm**: For AI orchestration.
- **python-dotenv**: For managing environment variables.
- **Flask**: For the API backend.

### Installation

To install Swarm:
```bash
pip install git+https://github.com/openai/swarm.git
```

Built at ETHGlobal San Francisco 2024 by AURUM team :)