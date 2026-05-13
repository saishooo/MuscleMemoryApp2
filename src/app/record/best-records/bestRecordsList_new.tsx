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
    <>
      <div className="flex mt-2">
        <p className="w-62 pl-2 font-bold">トレーニング</p>
        <p className="w-16 text-center font-bold">重量</p>
        <p className="w-16 text-center font-bold">回数</p>
      </div>
      <div className="h-80 overflow-y-auto">
        {records.map((t, index) => {
          let formattedDate = "";
          const updatedAt = new Date(t.updatedAt);
          formattedDate = `${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日`;

          return (
            <div key={t.id}>
              <div className="flex w-full">
                {/* <p className="w-[90px] ml-[7px]">{formattedDate}</p> */}
                <p className="w-62 pl-2">{t.exercise.name}</p>
                <p className="w-14 pl-2 text-center">{t.maxWeight}</p>
                <p className="w-16 pl-3 text-center">{t.maxReps}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
