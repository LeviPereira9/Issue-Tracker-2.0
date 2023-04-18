//React
import { useState } from 'react';

//Components
import { Container } from 'react-bootstrap';
import PrioritiesCards from '../components/layout/priorities/PrioritiesCards';
import Comments from '../components/shared/Comments';

//Icons
import {
  BsShieldFillExclamation,
  BsShieldFillCheck,
  BsFillHeartPulseFill,
} from 'react-icons/bs';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import useAuthPriorities from '../hooks/useAuthPriorities';

//Sla
import { format, formatDistance } from 'date-fns';
import useTimestamp from '../hooks/useTimestamp';

type Comment = {
  id: string;
  userId: string;
  img: string;
  name: string;
  at: string;
  text: string;
  likes: string[];
  replies?: {
    id: string;
    userId: string;
    name: string;
    img: string;
    at: string;
    text: string;
    likes: string[];
  }[];
};

const Priorities = () => {
  /* const bigIssueExample = [
    {
      docId: '310323-M000',
      groupId: ['310323-D021', '310323-D002', '310323-D013'],
      nivel: 2,
      creator: {
        id: 'b35iITFkUxManITs2evFfdJywFr1',
        name: 'Gus',
        department: 'Marketing',
      },
      assignedTo: {
        id: 'iYsVuKmr9sfny1pTNb8Tvi6X6HJ2',
        name: 'Mourice',
        department: 'TI',
      },
      subject: 'Official Instagram account.',
      desc: 'We lost access to the Instagram account for third parties, suspecting phishing.',
      createdAt: '12/03/2023 - 11:52:03',
      closedAt: undefined,
      expectedConclusion: '24 hours',
      status: {
        mode: 1,
        text: 'In progress',
      },
      priority: 'high',
      impact: {
        level: {
          mode: 2,
          text: 'Medium',
        },
        deparments: ['Sells', 'Marketing', 'Call Center'],
        onClients: true,
      },
      update: {
        last: '31/03/2023 - 16:24:59',
        comments: [
          {
            id: 'abada',
            userId: 'iYsVuKmr9sfny1pTNb8Tvi6X6HJ2',
            img: 'https://via.placeholder.com/75',
            name: 'Augustinho Carrara',
            at: '31/03/2023 - 16:13:22',
            text: 'The team has received the call and is currently prioritizing it. We have checked the other social media accounts and despite attempts to access them, no other accounts have been violated.',
            likes: ['iYsVuKmr9sfny1pTNb8Tvi6X6HJ2', 'Abada', 'Mangão'],
            replies: [
              {
                id: 'Mangão',
                userId: 'iYsVuKmr9sfny1pTNb8Tvi6X6HJ2',
                img: 'https://via.placeholder.com/50',
                name: 'Michael Jackson da Silva',
                at: '31/03/2023 - 16:20:31',
                text: 'Instagram outage announcement is being produced.',
                likes: ['iYsVuKmr9sfny1pTNb8Tvi6X6HJ2'],
              },
              {
                id: 'Mangão 2',
                userId: 'iYsVuKmr9sfny1pTNb8Tvi6X6HJ2',
                img: 'https://via.placeholder.com/50',
                name: 'Michael Jackson da Silva',
                at: '31/03/2023 - 16:20:31',
                text: 'Instagram outage announcement is being produced.',
                likes: ['iYsVuKmr9sfny1pTNb8Tvi6X6HJ2'],
              },
            ],
          },
          {
            id: 'Mangão',
            img: 'https://via.placeholder.com/75',
            userId: 'iYsVuKmr9sfny1pTNb8Tvi6X6HJ2',
            name: 'Michael Jackson da Silva',
            at: '31/03/2023 - 16:24:59',
            text: 'An announcement has been made on social media alerting that we are not in control of the Instagram account and advising not to continue any conversation at the moment.',
            likes: ['iYsVuKmr9sfny1dsadsapTNb8Tvi6X6HJ2', 'Abada', 'Mangão'],
          },
        ],
      },
    },
  ]; */
  const { loading, error, prioritieData } = useAuthPriorities();
  const { handleTimestamp } = useTimestamp();

  const [showUpdates, setShowUpdates] = useState(
    prioritieData && Array(prioritieData.length).fill(false),
  );

  const handleShowUpdates = (index: number) => {
    const newShowUpdates = [...showUpdates];
    newShowUpdates[index] = !newShowUpdates[index];
    setShowUpdates(newShowUpdates);
  };

  return (
    <main className="priorities mt-5">
      <Container as={'section'} className="priorities-header">
        <h1 className="priorities-header-title">Problems Priorities</h1>
        <span className="priorities-header-subTitle">
          Destaque e acompanhamento dos principais problemas de acordo com sua
          urgência e impacto.
        </span>
      </Container>
      <PrioritiesCards showSort={false} />
      <Container as={'article'} className="mt-5 priorities-issue">
        {Array.isArray(prioritieData) &&
          prioritieData.map((issue, index) => (
            <section key={issue.docId} className="priorities-issue-panel mb-4">
              <div className="priorities-issue-panel-header">
                <h3 className="priorities-issue-panel-header__title">
                  {issue.status.mode !== 2 ? (
                    <span className="priorities-issue-panel-header__title-icon processing">
                      <BsShieldFillExclamation />
                    </span>
                  ) : (
                    <span className="priorities-issue-panel-header__title-icon checked">
                      <BsShieldFillCheck />
                    </span>
                  )}{' '}
                  {issue.docId}
                </h3>
              </div>
              <div className="priorities-issue-panel-infos row">
                <div className="priorities-issue-panel-infos-left col-md-6">
                  <table>
                    <thead>
                      <tr>
                        <th className="table-title" colSpan={2}>
                          Issue Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="table-key">ID:</td>
                        <td className="table-value">{issue.docId}</td>
                      </tr>
                      <tr>
                        <td className="table-key">Creator:</td>
                        <td className="table-value">{issue.creator.name}</td>
                      </tr>
                      <tr>
                        <td className="table-key">Department:</td>
                        <td className="table-value">
                          {issue.creator.department}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-key">Created At:</td>
                        <td className="table-value">
                          {prioritieData[0] &&
                            handleTimestamp(issue.createdAt, false)}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-key">
                          {issue.closedAt ? 'Closed At: ' : 'Due Date: '}
                        </td>
                        <td className="table-value">
                          {issue.closedAt
                            ? handleTimestamp(issue.closedAt, true)
                            : issue.expectedConclusion}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-key">Subject:</td>
                        <td className="table-value">{issue.subject}</td>
                      </tr>
                      <tr>
                        <td className="table-key">Description:</td>
                        <td className="table-value">{issue.desc}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="priorities-issue-panel-infos-right col-md-6">
                  <table>
                    <thead>
                      <tr>
                        <th className="table-title" colSpan={2}>
                          Dealings Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="table-key">Status:</td>
                        <td className="table-value">{issue.status.text}</td>
                      </tr>
                      <tr>
                        <td className="table-key">Priority:</td>
                        <td className="table-value">{issue.priority}</td>
                      </tr>
                      <tr>
                        <th className="pt-2 pb-1" colSpan={2}>
                          Impact Details
                        </th>
                      </tr>
                      <tr>
                        <td className="table-key">Level:</td>
                        <td className="table-value">
                          {issue.impact.level.text}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-key">on Clients:</td>
                        <td className="table-value">
                          {issue.impact.onClients ? 'Yes' : 'No'}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-key">Departments:</td>
                        <td className="table-value">
                          {issue.impact.departments &&
                            issue.impact.departments.join(', ') + '.'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <h3 className="priorities-issue-panel-commentSection">
                Issue Updates{' '}
                <span
                  className="priorities-issue-panel-commentSection__toggle"
                  onClick={() => handleShowUpdates(index)}
                >
                  {showUpdates[index] ? (
                    <IoMdArrowDropdown />
                  ) : (
                    <IoMdArrowDropup />
                  )}
                </span>
              </h3>
              <div className={showUpdates[index] ? '' : 'hidden'}>
                <Comments
                  commentData={issue.update.comments as Comment[]}
                  showReplies={true}
                  docId={issue.docId}
                />
              </div>
            </section>
          ))}
      </Container>
    </main>
  );
};

export default Priorities;
