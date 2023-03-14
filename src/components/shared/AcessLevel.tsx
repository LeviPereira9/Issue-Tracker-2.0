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
      desc: 'Maior acesso ao sistema, com acesso ao gerenciamento de conteúdo do site, o que inclui a criação, edição e exclusão de conteúdo.',
    },
    {
      level: 3,
      title: 'Administrator',
      desc: 'Acesso total ao sistema, permitindo que gerencie todas as configurações e recursos, como usuários, departamentos e níveis de acesso.',
    },
  ];

  return (
    <div className="row justify-content-around my-3">
      {levels.map(level => (
        <Card className="col-8 col-md-4 text-center p-0 mb-3" key={level.title}>
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
