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
    <div className="h-[340px] overflow-y-auto">
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
              <p className="mt-[10px] ml-[10px]">{formattedDate}</p>
            )}

            {/* トレーニング */}
            <div className="flex w-full mt-[5px]">
              <p className="w-[180px] ml-[20px]">{t.exercise.name}</p>
              <p className="w-[100px] ml-[50px]">{t.weight}</p>
              <p className="w-[90px] ml-[40px]">{t.reps}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
