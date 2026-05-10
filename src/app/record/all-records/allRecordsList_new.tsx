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
  if (trainings.length === 0) {
    return <p>記録がありません</p>;
  }

  return (
    <>
      <div className="flex mt-2">
        <p className="w-60 pl-2 font-bold">トレーニング</p>
        <p className="w-18 text-center font-bold">重量</p>
        <p className="w-18 text-center font-bold">回数</p>
      </div>
      <div className="h-80 overflow-y-auto">
        {trainings.map((t, index) => {
          const date = new Date(t.createdAt); //⚫︎今の日付オブジェクトに変換
          const formattedDate = `${date.getMonth() + 1}月${date.getDate()}日`; //⚫︎今の日付を表示する形に変換

          const prevTraining = trainings[index - 1]; //⚫︎今見ている一個前のデータ
          //⚫︎prevTrainingの値があれば日付を作成し、なければ空にする
          const prevFormattedDate = prevTraining
            ? `${new Date(prevTraining.createdAt).getMonth() + 1}月${new Date(prevTraining.createdAt).getDate()}日`
            : "";
          const showDate = formattedDate !== prevFormattedDate; //違うならtrue,同じならfalse

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
                <p className="w-14 pl-1 text-center">{t.weight}</p>
                <p className="w-16 pl-7 text-center">{t.reps}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
