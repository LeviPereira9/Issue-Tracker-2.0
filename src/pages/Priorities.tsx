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
                  <tr>
                    <td colSpan={2}>
                      <strong>Issue Details</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Issue ID:</td>
                    <td>310323-M000</td>
                  </tr>
                  <tr>
                    <td>Creator:</td>
                    <td>Gus</td>
                  </tr>
                  <tr>
                    <td>Department:</td>
                    <td>Marketing</td>
                  </tr>
                  <tr>
                    <td>Created At:</td>
                    <td>12/03/2023 - 11:52:03</td>
                  </tr>
                  <tr>
                    <td>Due Date:</td>
                    <td>24 hours</td>
                  </tr>
                  <tr>
                    <td>Subject:</td>
                    <td>Official Instagram account.</td>
                  </tr>
                  <tr>
                    <td>Description:</td>
                    <td>
                      We lost access to the Instagram account for third parties,
                      suspecting phishing.
                    </td>
                  </tr>
                </div>
                <div className="priorities-issue-panel-infos-right col-lg-6">
                  <table>
                    <tr>
                      <td colSpan={2}>
                        <strong>Dealings Details</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Status:</td>
                      <td>In progress</td>
                    </tr>
                    <tr>
                      <td>Priority:</td>
                      <td>High</td>
                    </tr>
                    <tr>
                      <td>Impact Level:</td>
                      <td>Medium</td>
                    </tr>
                    <tr>
                      <td>Impact on Clients:</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Impacted Departments:</td>
                      <td>Sells, Marketing, Call Center</td>
                    </tr>
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
