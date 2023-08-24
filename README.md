# Pet Adoption App

Este é o README para a aplicação de adoção de animais de estimação. Através desta aplicação, você pode cadastrar, listar, atualizar e excluir animais de estimação disponíveis para adoção. Além disso, também é possível se cadastrar como uma organização (ORG) e visualizar detalhes dos animais para adoção.

## Funcionalidades

- [x] Cadastro de Animais de Estimação
- [x] Listagem de Todos os Animais Cadastrados
- [x] Atualização dos Dados de um Animal
- [x] Exclusão de um Animal
- [ ] Listagem de Animais Disponíveis para Adoção por Cidade
- [ ] Filtragem de Animais por Características
- [x] Visualização Detalhada de um Animal para Adoção
- [x] Cadastro de Organizações (ORG)
- [ ] Login para Organizações (ORG)

## Regras de Negócio

- [ ] Ao listar os animais, é obrigatório informar a cidade
- [x] Uma organização (ORG) precisa fornecer um endereço e um número de WhatsApp
- [x] Um animal deve estar associado a uma organização (ORG)
- [ ] Usuários interessados em adotar um animal entrarão em contato com a organização (ORG) via WhatsApp
- [ ] Todos os filtros, exceto a cidade, são opcionais
- [ ] Para que uma organização (ORG) acesse a aplicação como administrador, ela precisa estar logada

## Informações do Projeto

Este projeto utiliza as seguintes tecnologias e ferramentas:

- **Linguagem:** TypeScript
- **Banco de Dados:** Prisma
- **Framework Web:** Fastify
- **Gerenciamento de Imagens:** Cloudinary
- **Testes:** Vitest
- **Validação de Dados:** Zod

## Configuração e Uso

Para configurar e utilizar este projeto, siga os seguintes passos:

1. Clone este repositório
2. Instale as dependências com `npm install`
3. Crie um arquivo `.env` na raiz do projeto e preencha as variáveis de ambiente de acordo com o arquivo `.env.example`
4. Execute as migrations com `npm run migrate:dev`
5. Execute o projeto com `npm run dev`

## Testes

Para executar os testes, utilize o comando `npm run test`
