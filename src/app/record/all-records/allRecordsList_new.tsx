// src/app/record/all-records/allRecordsList.tsx
// 全てのトレーニングを表示する

//Trainingテーブルの型定義
type Training = {
  id: string;
  sessionId: string;
  exercise: {
    id: string;
    name: string;
  };
  exerciseId: string;
  weight: number;
  reps: number;
  createdAt: Date;
  updatedAt: Date;
};

//Exercisesテーブルの型定義
type Exercises = {
  id: string;
  name: string;
  categoryId: string;
};

//引数の定義
type Props = {
  trainings: Training[];
  exercises: Exercises[];
};

export default function AllRecordsList({ trainings, exercises }: Props) {
  const reversedTrainings = [...trainings].reverse();

  if (trainings.length === 0) {
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
        {reversedTrainings.map((t, index) => {
          const date = new Date(t.createdAt);

          const formattedDate = `${date.getMonth() + 1}月${date.getDate()}日`;

          const prevTraining = reversedTrainings[index - 1];

          const showDate =
            !prevTraining ||
            new Date(prevTraining.createdAt).toDateString() !==
              date.toDateString();
          return (
            <div key={t.id}>
              {/* 日付（変わった時だけ表示） */}
              {showDate && (
                //⚫︎showDateがtrueなら下記を実行
                <p className="pt-2 pl-3">{formattedDate}</p>
              )}

              {/* トレーニング */}
              <div className="flex w-full">
                <p className="w-62 pl-2">{t.exercise.name}</p>
                <p className="w-14 pl-2 text-center">{t.weight}</p>
                <p className="w-16 pl-3 text-center">{t.reps}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
