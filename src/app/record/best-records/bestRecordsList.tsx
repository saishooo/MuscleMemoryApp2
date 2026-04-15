// src/app/record/best-records/bestRecordsList.tsx
//最高記録を描写する

//Recordテーブルの型定義
type Record = {
  id: string;
  userId: string | null;
  exercise: {
    id: string;
    name: string;
  };
  exerciseId: string;
  maxWeight: number;
  maxReps: number;
  createdAt: Date;
  updatedAt: Date;
};

//Exerciseテーブルの型定義
type Exercises = {
  id: string;
  name: string;
  categoryId: string;
};

//引数の定義
type Props = {
  records: Record[];
  exercises: Exercises[];
};

export default function BestRecordsList({ records, exercises }: Props) {
  if (records.length === 0) {
    return <p>記録がありません</p>;
  }

  return (
    <div className="h-[340px] overflow-y-auto">
      {records.map((t, index) => {
        let formattedDate = "";
        const updatedAt = new Date(t.updatedAt);
        formattedDate = `${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日`;

        return (
          <div key={t.id}>
            <div className="flex w-full mt-[10px]">
              <p className="w-[90px] ml-[7px]">{formattedDate}</p>
              <p className="w-[180px] ml-[5px]">{t.exercise.name}</p>
              <p className="w-[50px] ml-[5px]">{t.maxWeight}</p>
              <p className="w-[50px] ml-[15px]">{t.maxReps}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
