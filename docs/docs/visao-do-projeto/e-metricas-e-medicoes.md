---
sidebar_label: "Métricas e medições"
sidebar_position: 5
---

# Métricas e medições

- A tabela abaixo, Tabela 13 de MÉTRICAS E MEDIÇÕES, reúne indicadores-chave para avaliar a performance de um time ágil:
    - **Velocidade da Sprint:** Mede a soma das horas estimadas das tarefas concluídas a cada iteração. Ajuda a monitorar produtividade e evoluir a capacidade de entrega.
    - **Desvio de Cronograma:** Compara o que foi planejado vs. entregue (em número de issues). Indica o grau de aderência ao planejamento e sinaliza necessidade de ajustes.
    - **Tempo Médio de Resolução:** Calcula o tempo médio entre relatório e fechamento de bugs ou impedimentos. Reflete a agilidade na resposta a problemas.
    - **Precisão das Estimativas:** Avalia a diferença percentual entre tempo real e estimado. Mostra se o time costuma subestimar ou superestimar o esforço.
    - **Taxa de Retrabalho:** Percentual de tarefas reabertas ou retrabalhadas.Serve como termômetro da qualidade inicial e do custo de correções.
- **Cada métrica traz:** Seu propósito, pergunta que responde, a fórmula de cálculo, unidade de medida, valor-alvo (ideal) e orientação para análise.

*Tabela 13: Métricas e medições (versão compacta).*

| Objetivo | Questão | Métrica | Definição | Fórmula | Unid. | Esperado | Análise |
|----------|---------|---------|-----------|---------|-------|----------|---------|
| Produtividade | Volume de trabalho por sprint? | Velocidade | Horas das issues concluídas | ∑ horas issues | h/sprint | Crescimento | Comparar sprints |
| Aderência | Entregue vs planejado? | Desvio | Diferença planejado-entregue | (Planejadas-Entregues)/Planejadas | % | 0% | Replanejamento |
| Resolução | Tempo para resolver bugs? | Tempo Médio | Média entre abertura-resolução | ∑ tempos/nº itens | dias | Redução | Fluidez |
| Estimativas | Precisão das estimativas? | Precisão | Real vs estimado | (Real-Estimado)/Estimado | % | ±10% | Viés |
| Retrabalho | Volume de correções? | Taxa | Issues reabertas | Reabertas/Total | % | Mínimo | Qualidade |

*Fonte: De autoria própria.*

## Tabela de métricas e medições das Sprints 
- Com base na metodologia SCRUM adotada no projeto, foram acompanhadas métricas referentes à produtividade, eficiência e estabilidade do time ao longo das sprints. As Tabelas a seguir apresentam dados extraídos das milestones e issues do repositório no GitHub, com base em critérios como:
- **Velocidade da Sprint:** soma dos dias corridos utilizados na execução das issues finalizadas.
- **Desvio de Cronograma:** percentual que representa a diferença entre as issues planejadas e efetivamente entregues.
- **Tempo Médio de Resolução:** média de dias entre abertura e fechamento das issues concluídas.
- **Retrabalho:** percentual de issues reabertas dentro da sprint.
- **Observações:** As observações adicionais indicam herança de atividades de sprints anteriores ou antecipações de demandas futuras, refletindo o processo iterativo e adaptável do SCRUM.
- Essas métricas possibilitam análises comparativas entre as sprints e apontam tendências relevantes para o planejamento e execução contínuos do projeto abaixo segue as tabelas de métricas e medições das Sprints de 1 a 7.

*Tabela 14: Métricas das Sprints (1-7)*
| Sprint | Veloc. | Desvio | T.Médio | Reab. | Observações |
|--------|--------|--------|---------|-------|-------------|
| 1 | 8d | +62,5% | 2,67d | 12,5% | Issue #5 reaberta |
| 2 | 36d | 0% | 9d | 0% | Concluiu heranças S1 |
| 3 | 19d | +25% | 6,33d | 0% | Issue #40 p/S5 |
| 4 | 28d | +66% | 9,33d | 0% | Issues p/S5-6 |
| 5 | 57d | -60% | 7,12d | 0% | Entregou + que planejado |
| 6 | 125d | -37% | 11,36d | 12,5% | Issue #2 reaberta |
| 7 | 63d | -50% | 7d | 0% | Concluiu S4-6 |

*Legenda: **Veloc.**=Velocidade (dias), **T.Médio**=Tempo Médio/Issue, **Reab.**=Issues Reabertas (%)*  
*Fonte: De autoria própria.*

## GQM de medições
- A Tabela 21 apresenta um conjunto de métricas alinhadas aos objetivos do Algiz EcoNet, seguindo a metodologia GQM (Goal-Question-Metric). Esses indicadores foram definidos para avaliar o desempenho da plataforma em três pilares principais: adesão das empresas, eficiência operacional e impacto ambiental.
- **Principais métricas e seus propósitos:**
    - Número de empresas cadastradas – Monitora o crescimento da plataforma, com meta de 50 empresas em 6 meses, refletindo a capacidade de atração do público-alvo.
    - Taxa de acordos concluídos – Mede a eficácia das negociações, com valor esperado de ≥70%, garantindo que as conexões gerem resultados concretos.
    - Volume de materiais redistribuídos – Quantifica o impacto ambiental, com expectativa de 500 kg/mês, alinhado ao propósito de economia circular (ODS 12.6).
    - Índice de satisfação (NPS) – Avalia a experiência dos usuários, buscando um NPS ≥ 30 para assegurar que a plataforma atenda às necessidades das empresas.
    - Tempo médio de negociação – Controla a agilidade dos processos, com meta de ≤ 5 dias, otimizando a eficiência operacional.
    - Taxa de retenção mensal – Verifica o engajamento contínuo, com objetivo de ≥80%, indicando que as empresas encontram valor na plataforma.
- **Como essas métricas se relacionam com o projeto?**
Suporte às funcionalidades principais: As métricas estão diretamente vinculadas a recursos como cadastro de empresas, gestão de contratos e chat (descritos no backlog, Tabela 10).
Indicadores de impacto: Dados como volume de resíduos redirecionados e NPS reforçam o compromisso com sustentabilidade e satisfação do usuário.
Otimização contínua: Métricas operacionais (ex.: tempo de negociação) ajudam a identificar gargalos e melhorar processos.
- Essa estrutura permite avaliar o sucesso da plataforma de forma quantitativa, garantindo que o projeto cumpra seus objetivos estratégicos e gere valor real para as empresas parceiras.

*Tabela 20: Métricas GQM (versão resumida)*

| Objetivo               | Métrica                     | Fórmula                          | Meta               | Análise                     |
|------------------------|-----------------------------|----------------------------------|--------------------|-----------------------------|
| **Satisfação**         | NPS                         | (Promotores-Detratores)/Total×100 | ≥30                | Feedback trimestral         |
| **Eficiência**         | Tempo médio de negociação   | ∑tempos/nº acordos               | ≤5 dias            | Identificar gargalos        |
| **Retenção**           | Taxa mensal de empresas     | (Ativas/Total)×100               | ≥80%               | Comparativo mensal          |
| **Adoção**             | Empresas cadastradas        | Contagem direta                  | 50 em 6 meses      | Crescimento vs meta         |
| **Conexões**           | Taxa de acordos             | (Acordos/Propostas)×100          | ≥70%               | Por tipo/setor              |
| **Redução de resíduos**| Volume redistribuído        | ∑materiais reutilizados          | 500kg/mês (3m)     | Impacto ambiental           |

*Fonte: Adaptado das tabelas originais.*

---

## Referência
### Documento de visão do produto e do projeto
Para acessar a versão mais atual (v1.2.0) do documento de visão do produto e do projeto, consulte o pdf  
[Visão do Produto e do Projeto - EcoNet](../../static/files/visao-do-produto-e-do-projeto-algiz-2025.1.pdf)
