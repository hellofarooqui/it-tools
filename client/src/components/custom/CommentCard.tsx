interface CommentType {
  user: string;
  comment: string;
}
const CommentCard = ({ comment }: { comment: CommentType }) => {
  return (
    <div className="flex flex-col bg-white border rounded-md p-4">
      <p className="text-xs font-semibold text-gray-500">{comment.user}</p>
      <p className="text-gray-700 text-sm">{comment.comment}</p>
    </div>
  );
};

export default CommentCard;
