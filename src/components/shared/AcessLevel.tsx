import React from 'react';

//Bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type acessLevelProps = {
  setAcessLevel: React.Dispatch<React.SetStateAction<number>>;
};

const AcessLevel: React.FC<acessLevelProps> = ({setAcessLevel}) => {
  const levels = [
    {
      level: 1,
      title: 'User',
      desc: 'Possui acesso aos recursos básicos do sistema, incluindo a possibilidade de abrir chamados, visualizar sua lista de chamados e atualizar suas informações de perfil.',
    },
    {
      level: 2,
      title: 'Technical',
      desc: 'Possui acesso aos recursos do sistema que permitem gerenciar os chamados, como definir prioridades, atribuir tarefas, atualizar status e fechar chamados. Além disso, também pode visualizar relatórios e estatísticas.',
    },
    {
      level: 3,
      title: 'Administrator',
      desc: 'Possui acesso total ao sistema e pode gerenciar todas as configurações e recursos, incluindo usuários, departamentos, categorias, configurações gerais do sistema e outras configurações avançadas. Também pode executar tarefas de manutenção e atualização.',
    },
  ];

  return (
    <div className="d-flex justify-content-between my-3">
      {levels.map(level => (
        <Card className="col-12 col-md-3 text-center" key={level.title}>
          <Card.Header>Nível de Acesso - {level.level}</Card.Header>
          <Card.Body>
            {/* <Card.Img variant='top' src='https://via.placeholder.com/300' className='h-25'/> */}
            <Card.Title>{level.title}</Card.Title>
            <Card.Text className="text-start">{level.desc}</Card.Text>
          </Card.Body>
          <div className="text-center mb-3">
            <Button
              className="w-50"
              variant="success"
              onClick={() => {
                setAcessLevel(level.level);
              }}
            >
              Chose
            </Button>
          </div>
          <Card.Footer></Card.Footer>
        </Card>
      ))}
    </div>
  );
};

export default AcessLevel;
