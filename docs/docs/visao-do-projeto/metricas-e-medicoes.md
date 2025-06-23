---
sidebar_label: "Métricas e Medições"
sidebar_position: 11
---

# Métricas e medições

A tabela abaixo de MÉTRICAS E MEDIÇÕES, reúne indicadores-chave para avaliar a performance de um time ágil:
- **Velocidade da Sprint:**
Mede a soma das horas estimadas das tasks concluídas a cada iteração. Ajuda a monitorar produtividade e evoluir a capacidade de entrega.
- **Desvio de Cronograma:**
Compara o que foi planejado vs. entregue (em número de issues). Indica o grau de aderência ao planejamento e sinaliza necessidade de ajustes.
- **Tempo Médio de Resolução:**
Calcula o tempo médio entre relatório e fechamento de bugs ou impedimentos. Reflete a agilidade na resposta a problemas.
**Precisão das Estimativas:**
Avalia a diferença percentual entre tempo real e estimado. Mostra se o time costuma subestimar ou superestimar esforço.  
- **Taxa de Retrabalho**
Percentual de tarefas reabertas ou retrabalhadas.Serve como termômetro da qualidade inicial e do custo de correções.

- **Cada métrica traz:**
    - Seu propósito,
    - A pergunta que responde,
    - A fórmula de cálculo,
    - Unidade de medida,
    - Valor-alvo (ideal)
    - Orientação para análise.

**Tabela de Métricas e Medições:**

| Objetivo de Medição               | Questão de Medição                              | Métrica                   | Definição                                                  | Fórmula de cálculo                                       | Unidade         | Valor esperado                     | Forma de Análise                                                                 |
|-----------------------------------|------------------------------------------------|---------------------------|------------------------------------------------------------|---------------------------------------------------------|-----------------|------------------------------------|----------------------------------------------------------------------------------|
| Avaliar a produtividade da equipe por sprint | Qual o volume de trabalho entregue por sprint? | **Velocidade da Sprint**      | Soma das horas estimadas das issues concluídas por sprint  | Soma das horas estimadas das issues entregues           | Horas por sprint | Tendência de crescimento ou estabilidade | Comparativo entre sprints, ajuda a identificar problemas ou eficiência          |
| Avaliar a aderência ao planejamento | O que foi entregue em relação ao planejado?    | **Desvio de Cronograma**      | Diferença entre o planejado e o entregue na sprint         | (Issues planejadas - Issues entregues) / Issues planejadas | %              | 0% ou mínimo desvio               | Indica necessidade de replanejamento ou problemas recorrentes                   |
| Avaliar tempo de resolução de problemas | Quanto tempo leva para resolver bugs ou impedimentos? | **Tempo Médio de Resolução** | Tempo médio entre a abertura e resolução de um bug/impedimento | Soma dos tempos de resolução / nº de itens resolvidos | Horas ou dias   | Redução progressiva               | Aponta fluidez da comunicação e capacidade de resolução                         |
| Avaliar confiabilidade das estimativas | As estimativas estão próximas do tempo real?   | **Precisão das Estimativas**  | Comparação entre tempo estimado e tempo real gasto         | (Tempo real - estimado) / tempo estimado                | %              | Entre -10% e +10%                 | Mostra se a equipe está subestimando ou superestimando                          |
| Medir volume de retrabalho        | Quanta refatoração ou correção foi necessária? | **Taxa de Retrabalho**        | Quantidade de tarefas reabertas ou retrabalhadas           | Nº de issues reabertas / total de issues                | %              | O menor possível                  | Avalia qualidade das entregas iniciais                                          |


## Tabela de métricas e medições das nossas Sprints

### 📈 Métricas da Sprint 1

| Métrica                  | Valor Obtido | Observações                                                                  |
|--------------------------|--------------|-------------------------------------------------------------------------------|
| Velocidade da Sprint     | 7 dias       | Issues #1 (2d), #8 (3d), #9 (3d)                                              |
| Desvio de Cronograma     | 62,5%        | Apenas 3 de 8 issues entregues                                               |
| Tempo Médio de Resolução | 2,67 dias    | Média dos dias das 3 issues fechadas                                         |
| Precisão das Estimativas | -            | Sem estimativas registradas                                                  |
| Taxa de Retrabalho       | 12,5%        | 1 issue (#5) reaberta entre as 8 planejadas                                  |

### 📈 Métricas da Sprint 2

| Métrica                  | Valor Obtido | Observações                                                                  |
|--------------------------|--------------|-------------------------------------------------------------------------------|
| Velocidade da Sprint     | 10 dias      | #3 (8d), #4 (7d), #6 (10d), #7 (11d)                                          |
| Desvio de Cronograma     | 0%           | 4 planejadas, 4 entregues                                                     |
| Tempo Médio de Resolução | 9 dias       | Média das issues                                                             |
| Precisão das Estimativas | -            | Sem estimativas registradas                                                  |
| Taxa de Retrabalho       | 0%           | Nenhuma issue reaberta                                                       |

### 📈 Métricas da Sprint 3

| Métrica                  | Valor Obtido | Observações                                                                  |
|--------------------------|--------------|-------------------------------------------------------------------------------|
| Velocidade da Sprint     | 13 dias      | #35 (8d), #36 (8d), #37 (3d)                                                  |
| Desvio de Cronograma     | 25%          | 4 planejadas, 3 entregues                                                     |
| Tempo Médio de Resolução | 6,33 dias    | Média das 3 issues                                                           |
| Precisão das Estimativas | -            | Sem estimativas registradas                                                  |
| Taxa de Retrabalho       | 0%           | Nenhuma issue reaberta                                                       |

### 📈 Métricas da Sprint 4

| Métrica                  | Valor Obtido | Observações                                                                  |
|--------------------------|--------------|-------------------------------------------------------------------------------|
| Velocidade da Sprint     | 10 dias      | #5 (22d), #67 (2d), #71 (4d)                                                  |
| Desvio de Cronograma     | 40%          | 5 planejadas, 3 entregues                                                     |
| Tempo Médio de Resolução | 9,33 dias    | Média das 3 issues                                                           |
| Precisão das Estimativas | -            | Sem estimativas registradas                                                  |
| Taxa de Retrabalho       | 0%           | Nenhuma issue reaberta                                                       |

### 📈 Métricas da Sprint 5

| Métrica                  | Valor Obtido | Observações                                                                  |
|--------------------------|--------------|-------------------------------------------------------------------------------|
| Velocidade da Sprint     | 20 dias      | #40 (19d), #61 (13d), #64 (12d*), #77 (0d), #80 (6d), #81 (6d), #86 (0d), #90 (0d) |
| Desvio de Cronograma     | 0%           | 5 planejadas, 8 entregues — superou o planejado                               |
| Tempo Médio de Resolução | 2,5 dias     | Média das issues, excluindo possíveis datas inconsistentes                    |
| Precisão das Estimativas | -            | Sem estimativas registradas                                                  |
| Taxa de Retrabalho       | 0%           | Nenhuma issue reaberta                                                       |
