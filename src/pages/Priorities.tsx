import React from 'react';

//Bootstrap
import { Container } from 'react-bootstrap';

//Icons
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';

const Priorities = () => {
  return (
    <main className="priorities">
      <Container as={'header'} className="priorities-header">
        <h1 className="priorities-header-title">Problems Priorities</h1>
        <span className="priorities-header-subTitle">
          Classificação e organização dos problemas de acordo com sua urgência e
          impacto
        </span>
      </Container>
      <Container fluid as={'article'} className="priorities-infos">
        <div className="priorities-infos__card">
          <p className="priorities-infos__card-text">Total Problems</p>
          <div className="priorities-infos__card-data">
            <span className="priorities-infos__card-data__numbers">1.659</span>
            <span className="priorities-infos__card-data__percentage">
              <HiOutlineDotsCircleHorizontal />
            </span>
          </div>
        </div>
        <div className="priorities-infos__card">
          <p className="priorities-infos__card-text">Problems closed</p>
          <div className="priorities-infos__card-data">
            <span className="priorities-infos__card-data__numbers">1.500</span>
            <span className="priorities-infos__card-data__percentage">
              <HiOutlineDotsCircleHorizontal />
            </span>
          </div>
        </div>
        <div className="priorities-infos__card">
          <p className="priorities-infos__card-text">Problems active now</p>
          <div className="priorities-infos__card-data">
            <span className="priorities-infos__card-data__numbers">129</span>
            <span className="priorities-infos__card-data__percentage">
              <HiOutlineDotsCircleHorizontal />
            </span>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Priorities;
