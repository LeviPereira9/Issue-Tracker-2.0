//React
import { useState, useEffect, useRef } from 'react';

//Components
import { Container } from 'react-bootstrap';
import PrioritiesCards from '../components/layout/priorities/PrioritiesCards';

//Icons
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TbClockHour2 } from 'react-icons/tb';
import {
  BsShieldFillExclamation,
  BsShieldFillCheck,
  BsThreeDots,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
  BsFillChatLeftTextFill,
} from 'react-icons/bs';
import { RiThumbUpLine, RiThumbUpFill } from 'react-icons/ri';

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
    at: string;
    text: string;
    likes: string[];
  }[];
};

const Priorities = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  ];

  const userId: string = 'iYsVuKmr9sfny1pTNb8Tvi6X6HJ2';
  //Menu Refs.
  const menuRefs = useRef<(HTMLUListElement | null)[]>([]);
  const [comments, setComments] = useState<Comment[]>(
    bigIssueExample.map(issue => issue.update.comments).flat(),
  );
  const [openReplies, setOpenReplies] = useState<boolean[]>(
    Array(comments.length).fill(false),
  );
  const [openMenus, setOpenMenus] = useState<boolean[]>(
    Array(comments.length).fill(false),
  );

  const handleLikeComment = (commentId: string, userId: string) => {
    const updatedComments = comments.map((comment: Comment) => {
      if (comment.id === commentId) {
        //Passa por todos os comentários, se o id for o mesmo...
        if (comment.likes.includes(userId)) {
          //Se já tiver dado like, é retirado.
          const updatedLikes = comment.likes.filter(
            usersId => usersId !== userId,
          );
          return { ...comment, likes: updatedLikes };
        } else {
          //Se não, adiciona.
          const updatedLikes = [...comment.likes, userId];
          return { ...comment, likes: updatedLikes };
        }
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleMenuOpen = (index: number) => {
    setOpenMenus(prevOpenMenus => {
      const newOpenMenus = prevOpenMenus.map((isOpen, i) => {
        // Fecha os menus antigos, exceto o que está sendo aberto
        if (isOpen && i !== index) {
          return false;
        }
        return isOpen;
      });
      // Define o estado do menu que está sendo aberto
      newOpenMenus[index] = !newOpenMenus[index];
      return newOpenMenus;
    });
  };

  // Função para fechar os menus quando clica fora deles.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Percorre a lista de refs para fechar todos os menus
      menuRefs.current.forEach(ref => {
        if (
          ref &&
          !ref.contains(event.target as Node) &&
          !(
            event.target instanceof Element &&
            event.target.closest('.comment-info-header-tools__toggle')
          )
        ) {
          setOpenMenus(openMenus.map(() => false));
        }
      });
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openMenus]);

  const handleOpenReplies = (index: number) => {
    const newOpenReplies = [...openReplies];
    newOpenReplies[index] = !newOpenReplies[index];
    setOpenReplies(newOpenReplies);
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
        {bigIssueExample &&
          bigIssueExample.map(issue => (
            <section key={issue.docId} className="priorities-issue-panel">
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
                        <td className="table-value">{issue.createdAt}</td>
                      </tr>
                      <tr>
                        <td className="table-key">
                          {issue.closedAt ? 'Closed At: ' : 'Due Date: '}
                        </td>
                        <td className="table-value">
                          {issue.closedAt
                            ? issue.closedAt
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
                          {issue.impact.deparments.join(', ') + '.'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="priorities-issue-panel-comments">
                {comments.map((comment, index) => (
                  <div key={comment.id} className="comment">
                    <div className="comment-userProfile">
                      <img
                        src={comment.img}
                        alt="User profile"
                        className="comment-userProfile-img"
                      />
                    </div>
                    <div className="comment-info">
                      <div className="comment-info-header">
                        <div className="comment-info-header-user">
                          <span className="h6">{comment.name} •</span>
                          <span className="comment-info__at">
                            {' '}
                            {comment.at}
                          </span>
                        </div>
                        <div className="comment-info-header-tools">
                          <span className="comment-info-header-tools__toggle">
                            <BsThreeDots
                              onClick={() => {
                                handleMenuOpen(index);
                              }}
                            />
                          </span>
                          <ul
                            className={`comment-info-header-tools__options ${
                              !openMenus[index] && 'hidden'
                            }`}
                            ref={ref => {
                              if (ref) {
                                menuRefs.current[index] = ref;
                              }
                            }}
                          >
                            <li>Pin</li>
                            <li>Share</li>
                            <li>Report</li>
                          </ul>
                        </div>
                      </div>
                      <p className="comment-info__text">{comment.text}</p>
                      <div className="comment-info__tools">
                        <div className="comment-info__tools-likes">
                          {comment.likes.includes(userId) ? (
                            <RiThumbUpFill
                              className="comment-info__tools-likes__thumbFill"
                              onClick={() => {
                                handleLikeComment(comment.id, userId);
                              }}
                            />
                          ) : (
                            <RiThumbUpLine
                              className="comment-info__tools-likes__thumb"
                              onClick={() => {
                                handleLikeComment(comment.id, userId);
                              }}
                            />
                          )}
                          <span className="comment-info__tools-likes__count">
                            {' '}
                            {comments[index].likes.length}
                          </span>
                        </div>
                        <div className="comment-info__tools-replies">
                          {true && (
                            <BsFillChatLeftTextFill
                              className="comment-info__tools-replies__comment"
                              onClick={() => {
                                handleOpenReplies(index);
                              }}
                            />
                          )}
                          <span className="comment-info__tools-replies__count">
                            {comments[index].replies
                              ? comments[index].replies?.length
                              : '0'}
                          </span>
                        </div>
                      </div>
                      <div
                          className={`comment-info__replies ${
                            !openReplies[index] && 'hidden'
                          }`}
                        >Olá mundo!</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
      </Container>
    </main>
  );
};

export default Priorities;
