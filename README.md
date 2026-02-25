# Portal de Ferramentas Utilitárias

## Sobre o projeto

Este projeto consiste em um portal com três ferramentas principais:

- Lista de tarefas (TaskMaster)
- Cadastro de contatos (ConnectHub)
- Controle financeiro simples (MoneyFlow)

O objetivo foi desenvolver uma aplicação utilizando React com TypeScript, aplicando validações, organização de código e persistência de dados no localStorage.

---

## Tecnologias utilizadas

- React (Vite)
- TypeScript
- TailwindCSS
- React Hook Form
- Zod
- React Router Dom
- LocalStorage

---

## Funcionalidades

### Home
Página inicial com navegação para os módulos do sistema.

### TaskMaster
- Cadastro de tarefas
- Validação de título (mínimo 5 caracteres)
- Listagem dinâmica
- Remoção de tarefas
- Marcação como concluída
- Salvamento automático no localStorage

### ConnectHub
- Cadastro de nome, e-mail e telefone
- Validação de e-mail
- Telefone aceitando apenas números

### MoneyFlow
- Registro de entradas e saídas
- Validação de valor positivo
- Cálculo automático do saldo
- Persistência no localStorage

---

## Organização

Estrutura de pastas utilizada:

```
src/
├── components/
├── pages/
├── schemas/
└── App.tsx
```

### Créditos


Feito por João Pedro Luciano da Silva

---

Projeto desenvolvido como atividade acadêmica.
