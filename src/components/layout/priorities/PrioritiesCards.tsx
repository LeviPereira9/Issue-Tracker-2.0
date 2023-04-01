import { useState } from 'react';

//Bootstrap
import { Container } from 'react-bootstrap';

//Icons
import { BiSortUp, BiSortDown } from 'react-icons/bi';
import { SiSimpleanalytics } from 'react-icons/si';

const PrioritiesCards = ({ showSort }: { showSort: boolean }) => {
  const [sortTotal, setSortTotal] = useState(false);
  const [sortClosed, setSortClosed] = useState(false);
  const [sortActive, setSortActive] = useState(false);

  return (
    <>
      <Container fluid as={'article'} className="priorities-infos row gap-5">
        <div className="priorities-infos__card">
          <p className="priorities-infos__card-text">Total Problems</p>
          <div className="priorities-infos__card-data">
            <span className="priorities-infos__card-data__numbers">1.659</span>
            {showSort ? (
              <span
                className="priorities-infos__card-data__sort"
                aria-label="Ordenar tabela por data"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSortTotal(!sortTotal);
                  setSortActive(false);
                  setSortClosed(false);
                }}
              >
                {sortTotal ? <BiSortDown /> : <BiSortUp />}
              </span>
            ) : (
              <span className="priorities-infos__card-data__notSort">
                <SiSimpleanalytics />
              </span>
            )}
          </div>
        </div>
        <div className="priorities-infos__card">
          <p className="priorities-infos__card-text">Problems closed</p>
          <div className="priorities-infos__card-data">
            <span className="priorities-infos__card-data__numbers">1.500</span>
            {showSort ? (
              <span
                className="priorities-infos__card-data__sort"
                aria-label="Ordenar tabela por chamados fechados"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSortClosed(!sortClosed);
                  setSortTotal(false);
                  setSortActive(false);
                }}
              >
                {sortClosed ? <BiSortDown /> : <BiSortUp />}
              </span>
            ) : (
                <span className="priorities-infos__card-data__notSort">
                  <SiSimpleanalytics />
                </span>
              )}
          </div>
        </div>
        <div className="priorities-infos__card">
          <p className="priorities-infos__card-text">Problems active now</p>
          <div className="priorities-infos__card-data">
            <span className="priorities-infos__card-data__numbers">129</span>
            {showSort ? (
              <span
                className="priorities-infos__card-data__sort"
                aria-label="Ordenar tabela por chamados abertos e em análise"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSortActive(!sortActive);
                  setSortTotal(false);
                  setSortClosed(false);
                }}
              >
                {sortActive ? <BiSortDown /> : <BiSortUp />}
              </span>
            ) : (
                <span className="priorities-infos__card-data__notSort">
                  <SiSimpleanalytics />
                </span>
              )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrioritiesCards;
