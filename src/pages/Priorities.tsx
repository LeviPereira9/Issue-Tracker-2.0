//Components
import { Container } from 'react-bootstrap';
import PrioritiesCards from '../components/layout/priorities/PrioritiesCards';

//Icons
import { TbClockHour2 } from 'react-icons/tb';

const Priorities = () => {
  const issueExemple = {
    docId: 'Canvote',
    creatorId: 'b35iITFkUxManITs2evFfdJywFr1',
    categoryIssue: 'Marketing',
    subject: 'Conta oficial do instagram.',
    descIssue:
      'Perdemos o acesso a conta do instagram para terceiros, suspeitamos de phishing.',
    createdAt: '12/03/2023 - 11:52:03',
    closedAt: undefined,
    expectedCompletion: undefined,
    priority: 'high',
    status: 'open',
    comments: [
      {
        commenterId: 'b35iITFkUxManITs2evFfdJywFr1',
        commenterName: 'Chris',
        commenterDepartment: 'TI',
        commentDesc:
          'Conversando pelo teams, eles apontaram que outras contas também sofreram tentativas de acesso, mas somente o instagram não possuia o fator de duas etapas.',
      },
    ],
    parentIssueId: undefined,
    response: undefined,
  };

  const bigIssueExample = [
    {
      docId: '310323-M000',
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
        mode: 2,
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
            at: '31/03/2023 - 16:13:22',
            text: 'The team has received the call and is currently prioritizing it. We have checked the other social media accounts and despite attempts to access them, no other accounts have been violated.',
          },
          {
            at: '31/03/2023 - 16:24:59',
            text: 'An announcement has been made on social media alerting that we are not in control of the Instagram account and advising not to continue any conversation at the moment.',
          },
        ],
      },
    },
  ];

  return (
    <main className="priorities mt-5">
      <Container as={'header'} className="priorities-header">
        <h1 className="priorities-header-title">Problems Priorities</h1>
        <span className="priorities-header-subTitle">
          Destaque e acompanhamento dos principais problemas de acordo com sua
          urgência e impacto.
        </span>
      </Container>
      <PrioritiesCards showSort={false} />
      <Container as={'article'} className="mt-5 priorities-issue">
        {bigIssueExample &&
          bigIssueExample.map(issue => (
            <section key={issue.docId} className="priorities-issue-panel">
              <div className="priorities-issue-panel-header">
                <h3 className="priorities-issue-panel-header__title">
                  <TbClockHour2 /> {issue.docId}
                </h3>
              </div>
              <div className="priorities-issue-panel-infos row">
                <div className="priorities-issue-panel-infos-left col-lg-6">
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={2}>
                          Issue Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='table-title'>ID:</td>
                        <td className='table-value'>{issue.docId}</td>
                      </tr>
                      <tr>
                        <td className='table-title'>Creator:</td>
                        <td className='table-value'>{issue.creator.name}</td>
                      </tr>
                      <tr>
                        <td className='table-title'>Department:</td>
                        <td className='table-value'>{issue.creator.department}</td>
                      </tr>
                      <tr>
                        <td className='table-title'>Created At:</td>
                        <td className='table-value'>{issue.createdAt}</td>
                      </tr>
                      <tr>
                        <td className='table-title'>{issue.closedAt ? 'Closed At: ' : 'Due Date: '}</td>
                        <td className='table-value'>
                          {issue.closedAt
                            ? issue.closedAt
                            : issue.expectedConclusion}
                        </td>
                      </tr>
                      <tr>
                        <td className='table-title'>Subject:</td>
                        <td className='table-value'>{issue.subject}</td>
                      </tr>
                      <tr>
                        <td className='table-title'>Description:</td>
                        <td className='table-value'>{issue.desc}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="priorities-issue-panel-infos-right col-lg-6">
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={2}>Dealings Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='table-title'>Status:</td>
                        <td className='table-value'>{issue.status.text}</td>
                      </tr>
                      <tr>
                        <td className='table-title'>Priority:</td>
                        <td className='table-value'>{issue.priority}</td>
                      </tr>
                      <tr>
                        <th className='pt-2 pb-1' colSpan={2}>Impact Details</th>
                      </tr>
                      <tr>
                        <td className='table-title'>Level:</td>
                        <td className='table-value'>{issue.impact.level.text}</td>
                      </tr>
                      <tr>
                        <td className='table-title'>on Clients:</td>
                        <td className='table-value'>{issue.impact.onClients ? 'Yes' : 'No'}</td>
                      </tr>
                      <tr>
                        <td className='table-title'>Departments:</td>
                        <td className='table-value'>{issue.impact.deparments}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ))}
      </Container>
    </main>
  );
};

export default Priorities;
