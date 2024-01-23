import { deleteBoard } from "@/actions/deleteBoard";
import { FormDelete } from "./form-delete";

interface BoardProps {
  id: string;
  title: string;
}
export const Board = ({ id, title }: BoardProps) => {

  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <form className="flex items-center gap-x-2" action={deleteBoardWithId}>
      <p>
        Board title: {title}
      </p>
      <FormDelete />
    </form>
  )
}

