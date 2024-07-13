# <p align = "center">{ reprograma } </p>
## <p align = "center">Xodó Bank</p>

<p align = "center">
   <img src="https://img.shields.io/badge/autor-luanalessa-FF5757?style=flat-square" />
   <img src="https://img.shields.io/badge/semana-01-FF5757?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/luanalessa/ts-backend-template?color=FF5757&style=flat-square" />
</p>

<p align = "center">
  <img width="300px" src="https://github.com/luanalessa/on36-ijs-xodo-bank/assets/72531277/55e783ae-7df7-4af0-aa80-d1d507d5f2fb" />
</p>

<br>

## 💡 Case

Bancos comunitários são serviços financeiros solidários que visam gerar trabalho e renda, promovendo o desenvolvimento de economias locais, especialmente em territórios de baixa renda, por meio do apoio à economia popular e solidária.

Sabendo disso, a comunidade da { reprograma } decidiu criar um banco comunitário pensando nos conceitos de economia popular solidária, com serviços baseados no documento feito pela [Rede Brasileira de Bancos Comunitários](https://repositorio.ipea.gov.br/bitstream/11058/4059/1/bmt41_10_Eco_Bancos_41.pdf).

<br>

## 📂 Descrição do Projeto

- **Sistema**: Banco Social.
- **Paradigma escolhido**:  Programação Orientada a Objetos (POO)
- **Descrição**: Bancos comunitários são serviços financeiros solidários que visam gerar trabalho e renda, promovendo o desenvolvimento de economias locais, especialmente em territórios de baixa renda, por meio do apoio à economia popular e solidária
- **Objetivo**:  O desenvolvimento econômico, social e sustentável da cidade de Itaiçaba, interior do Ceará.

<br>

## ✅ Checklist Serviços

- [x] Crédito para financiamento de empreendimentos solidários.
- [x] Crédito para consumo pessoal e familiar, sem juros.
- [x] Cartão de crédito popular solidário.
- [x] Abertura e extrato de conta corrente.
- [x] Depósito em conta corrente.
- [x] Saque avulso ou com cartão magnético.
- [x] Pagamento de contas (água, luz, telefone etc.).
- [x] Recebimento de aposentadorias e outros valores governamentais
- [x] Gerentes da conta
- [x] Prestação de contas diário e semanal para toda a comunidade
- [x] Desafio extra: Moeda social circulante local.
<br>

## 🚩 Diagrama de entidades e relacionamentos
<br>
<p align = "center">
<img alt="DER" src="https://github.com/user-attachments/assets/9acdbabd-5dd2-4ef5-947c-2a734ee38f0d">
</p>
<br> 

**Relacionamentos:**
```shell
- Bank → Coin
Relacionamento: release (libera)
Cardinalidade: 1:N, Um banco pode liberar várias moedas.

- Bank → Manager 
Relacionamento: has (tem)
Cardinalidade: 1:N, Um banco pode ter vários gerentes.
```
```shell
Manager → Account
Relacionamento: manage (gerencia)
Cardinalidade: 1:N, Um gerente pode gerenciar várias contas.
```
```shell
Account → Manager
Relacionamento: manage (gerencia)
Cardinalidade: 1:1, Uma conta só pode ser gerenciada por um gerente.

Account → Customer
Relacionamento: has (tem)
Cardinalidade: 1:1, Uma conta pertence a um cliente.
```
```shell
Customer → Account
Relacionamento: has (tem)
Cardinalidade: 1:N, Um cliente pode ter várias contas.

Customer → Transaction
Relacionamento: does (faz)
Cardinalidade: 1:N, Um cliente pode fazer várias transações
```

```shell
Transaction → Installment:
Relacionamento: has (tem)
Cardinalidade: 1:N, Uma transação pode ter várias parcelas.
```
```shell
Account →  Card:
Relacionamento: has (tem)
Cardinalidade: 1:N, Uma conta pode ter vários cartões

Account →  Loan:
Relacionamento: has (tem)
Cardinalidade: 1:N, Uma conta pode ter vários empréstimos
```

Subtipos
```shell
Account pode ser:
- Checking (Conta Corrente)
- Savings (Conta Poupança)
```
```shell
Card pode ser:
- Credit (Crédito)
- Debit (Débito)
```
```shell
Loan pode ser:
- Solidary (Solidário)
- Personal (Pessoal)
```

<br>

## 🏳️ Diagrama de classes 
<br>

<p align = "center">
<img alt="Capturar" src="https://github.com/user-attachments/assets/b9fa556c-ee58-4d66-9fcc-f58720310d11">
</p>

<br> 

## 🤝 Contribuições

Se você tem uma ideia divertida para uma nova funcionalidade ou uma melhoria, sinta-se à vontade para fazer um fork do repositório e enviar um pull request. 
<br> 

## 📧 Contato: 

Tem perguntas ou sugestões? Entre em contato pelo email lessalsn@gmail.com.

<br> 
<br> 

<strong><p align = "center"> Este projeto faz parte do curso de JavaScript com foco em backend e AWS da { reprograma } </p></strong>
