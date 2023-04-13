//React
import { useState, useEffect, useRef } from 'react';

//Icons
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TbClockHour2 } from 'react-icons/tb';
import { BsThreeDots, BsFillChatLeftTextFill } from 'react-icons/bs';
import { RiThumbUpLine, RiThumbUpFill } from 'react-icons/ri';

type Comment = {
  id: string;
  userId: string;
  img: string;
  name: string;
  at: string;
  text: string;
  likes: string[];
  replies?: Comment[];
};

type CommentsProps = {
  showReplies: boolean;
  commentData: Comment[];
};

const Comments = ({ showReplies, commentData }: CommentsProps) => {
  
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

  const userId: string = 'iYsVuKmr9sfny1pTNb8Tvi6X6HJ2';
  //Menu Refs.
  const menuRefs = useRef<(HTMLUListElement | null)[]>([]);
  const [comments, setComments] = useState<Comment[]>(commentData);
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

  console.log(comments);

  
  return (
    <div className="priorities-issue-panel-comments">
      {comments.map((comment, index) => (
        <div key={comment.id} className={showReplies ? "comment" : "comment replies"}>
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
                <span className="comment-info__at"> {comment.at}</span>
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
                {showReplies && (
                  <BsFillChatLeftTextFill
                    className="comment-info__tools-replies__comment"
                    onClick={() => {
                      handleOpenReplies(index);
                    }}
                  />
                )}
                {showReplies && (
                  <span className="comment-info__tools-replies__count">
                    {comments[index].replies
                      ? comments[index].replies?.length
                      : '0'}
                  </span>
                )}
              </div>
            </div>
            <div
              className={`comment-info__replies ${
                !openReplies[index] && 'hidden'
              }`}
            >
              {showReplies && comment.replies && (
                <Comments
                  showReplies={false}
                  commentData={comments[index].replies!}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
