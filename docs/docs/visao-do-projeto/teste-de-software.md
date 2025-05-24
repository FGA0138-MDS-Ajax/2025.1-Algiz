---
sidebar_label: "Teste de Software"
sidebar_position: 10
---
# Teste de Software

### Estratégia de testes contendo:
Esta estratégia de testes visa garantir a qualidade, confiabilidade e robustez da aplicação por meio de uma abordagem em múltiplas camadas. O foco é identificar e corrigir os defeitos o mais cedo possível no ciclo de desenvolvimento, reduzindo custos e facilitando a manutenção contínua.  

**Princípios Gerais:**
- **Detecção Antecipada:** Priorizar a identificação de bugs na fases iniciais do desenvolvimento
- **Cobertura Abrangente:** Busca uma cobertura de testes significativa em todos os níveis, alinhada com os riscos e a criticidade de cada componente.
- **Colaboração:** Fomentar a colaboração entre desenvolvedores e testadores (QAs) para uma compreensão compartilhada da qualidade.
- **Melhoria Contínua:** Revisar e adaptar a estratégia de testes com base nos feedbacks e resultados obtidos.

**Os tipos de testes que serão utilizados:**
- **Testes Unitários:** Verificar a menor parte testável do software como funções, métodos ou classes de forma isolada. O foco é garantir que cada "unidade" de código se comporte exatamente como esperado, validando sua lógica interna, manipulação de entradas, produção de saídas corretas e tratamento de erros. O teste de unidade visa verificar a menor porção testável do software (funções, métodos ou classes) isoladamente. O objetivo principal é assegurar que cada unidade de código funcione conforme o esperado, validando sua lógica interna, o tratamento das entradas, a produção das saídas corretas e o tratamento de erros.
- **Testes de Integração:** Verificar a interação e a comunicação correta entre diferentes componentes, módulos, serviços (como APIs) ou até mesmo sistemas externos. O foco é descobrir defeitos nas interfaces e nas interações entre partes integradas.Garantir a comunicação e a interação adequadas entre os diversos componentes, módulos, serviços (APIs) ou sistemas externos. O objetivo principal é identificar falhas nas interfaces e nas interconexões das partes integradas.
- **Testes de Sistema e testes Funcionais:** Validar o comportamento do sistema completo e integrado em relação aos requisitos funcionais e especificações de negócio. O foco é simular o uso real da aplicação por um usuário final, verificando se os fluxos de negócio funcionam de ponta a ponta (End-to-End).O objetivo é verificar o comportamento do sistema completo e integrado em relação aos requisitos funcionais e especificações de negócio. A validação concentra-se na simulação do uso real da aplicação por um usuário final, garantindo que os fluxos de negócio operem de ponta a ponta (End-to-End).

### Roteiro de teste:

Constitui-se um planejamento dos casos de testes que serão executados. Deve conter:
- **Código de identificação do teste:** Um identificador único (alfanumérico) para rastreabilidade e referência.
- **Nome do teste:** Um título breve e descritivo que resume a finalidade do teste.
- **Objetivo do teste:** Uma descrição clara do que o teste visa verificar ou validar.
- **Nível do teste:** Indica a fase do desenvolvimento em que o teste é aplicado.
- **Tipo de teste:** Classifica o teste quanto à sua natureza.
- **Precondições para o teste ser realizado:** Condições ou estados do sistema/ambiente que devem ser verdadeiros antes da execução do teste.
- **Definição de Aceito rejeitado dos testes propostos:** Resultados esperados para o teste ser aceito como OK.
- **Espaço para registro dos resultados do teste (com evidências objetivas):** Campo para registrar o resultado real obtido durante a execução.
- **Reparos executados:** Descrição das correções ou ajustes feitos no sistema ou no próprio caso de teste após uma falha e antes de um teste.
- **Quantidade de ciclos de testes executados para cada caso de teste proposto:** Registro de quantas vezes o caso de teste foi executado (especialmente útil para testes que falharam e foram retestados).


**A Abordagem GQM (Goal-Question-Metric) para Orientar os Testes**
Para garantir que os esforços de teste estejam alinhados com os objetivos de qualidade do projeto e que seus resultados sejam mensuráveis, sugere-se a utilização da abordagem **GQM (Goal-Question-Metric)**. Esta abordagem ajuda a definir metas claras, as questões que precisam ser respondidas para alcançar essas metas, e as métricas que fornecerão as respostas.
Os testes de software são **obrigatórios** e essenciais para o desenvolvimento de um produto de qualidade. Eles não são uma fase opcional, mas uma parte integrante do ciclo de vida do desenvolvimento, crucial para mitigar riscos, reduzir custos de correção tardia, aumentar a confiança no produto e garantir a satisfação do usuário. A abordagem GQM ajuda a estruturar e justificar o esforço de teste.
