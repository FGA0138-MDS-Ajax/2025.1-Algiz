import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '💡 Foco Sustentável',
    Svg: () => (
      <img
        src={require('@site/static/img/docs-home1.png').default}
        alt="Foco Sustentável"
      />),
    description: (
      <>
      A plataforma EcoNet conecta empresas com excedentes de material a organizações que buscam 
      insumos sustentáveis, promovendo a economia circular no setor industrial e evitando o desperdício.
      </>
    ),
  },
  {
    title: '🤝 Conexão e Colaboração',
    Svg: () => (
      <img
        src={require('@site/static/img/docs-home2.png').default}
        alt="Conexão e Colaboração"
      />),
    description: (
      <>
        Permitindo que as empresas atuem como fornecedoras e receptores dentro de um mesmo 
        sistema, a EcoNet facilita parcerias baseadas em transparência 
        contratual, fortalecendo a comunicação entre as companhias da cadeia produtiva.
      </>
    ),
  },
  {
    title: '📂 Gestão de Documentos',
    Svg: () => (
      <img
        src={require('@site/static/img/docs-home3.png').default}
        alt="Gestão de Documentos"
      />),
    description: (
      <>
        O diferencial da EcoNet está na gestão segura de contratos e documentos, 
        garantindo eficiência operacional no armazenamento e na gestão de documentos relevantes
        para as empresas.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
