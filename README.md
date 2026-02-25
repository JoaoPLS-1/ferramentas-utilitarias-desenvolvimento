# Portal de Ferramentas Utilitárias

## 📌 Visão do Produto

O Portal de Ferramentas Utilitárias é uma aplicação web desenvolvida com o objetivo de reunir ferramentas simples e práticas para organização pessoal e controle de informações. 

O sistema permite ao utilizador:

- Organizar tarefas diárias
- Cadastrar contactos
- Controlar entradas e saídas financeiras
- Visualizar saldo atualizado automaticamente

A aplicação foi construída com foco em tipagem forte, validação de dados e persistência local, garantindo que as informações permaneçam salvas mesmo após o recarregamento da página.

---

## 🛠️ Stack Tecnológica

- **React (Vite) + TypeScript**
- **TailwindCSS**
- **React Hook Form**
- **Zod + @hookform/resolvers**
- **React Router Dom**
- **LocalStorage API**

---

## 📂 Estrutura do Projeto

```
src/
├── components/   # Componentes reutilizáveis (Button, Header, Navbar)
├── pages/        # Páginas principais (Home, TaskMaster, ConnectHub, MoneyFlow)
└── App.tsx
```

---

## 📍 Módulos da Aplicação

### 🏠 Home
Página inicial com navegação para os três módulos principais.

---

### ✅ TaskMaster (ToDo List)
- Adição de tarefas
- Listagem dinâmica
- Remoção de tarefas
- Marcação como concluída
- Persistência automática no localStorage
- Validação: Título mínimo de 5 caracteres

---

### 📇 ConnectHub (Cadastro de Contatos)
- Cadastro de nome completo
- Validação de e-mail
- Validação de telefone (apenas números)
- Persistência opcional no localStorage

---

### 💰 MoneyFlow (Controle Financeiro)
- Registro de entradas e saídas
- Validação de valor positivo
- Cálculo automático do saldo total
- Persistência no localStorage

---

## 📈 Metodologias Ágeis

Este projeto foi estruturado simulando uma Sprint real, incluindo:

- Definição de User Stories (Issues)
- Critérios de Aceitação
- Organização por Milestones
- Planejamento incremental das funcionalidades

---

## 🎯 Objetivo Acadêmico

O projeto tem como objetivo consolidar conhecimentos em:

- Componentização
- Tipagem com TypeScript
- Validação de formulários
- Persistência de dados
- Organização de projeto
- Planejamento ágil

### Créditos

Feito por João Pedro Luciano da Silva

---

Desenvolvido para fins acadêmicos.
