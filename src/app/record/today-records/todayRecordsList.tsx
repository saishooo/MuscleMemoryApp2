// src/app/record/today-records/todayRecordsList.tsx
// 今日登録したトレーニングを表示する

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

//引数の型定義
type Props = {
  trainings: Training[];
  exercises: Exercises[];
};

export default function TodayRecordsList({ trainings, exercises }: Props) {
  if (trainings.length === 0) {
    return <p>記録がありません</p>;
  }

  return (
    <div className="h-[340px] overflow-y-auto">
      {trainings.map((t) => (
        <div key={t.id} className="flex w-full mt-[10px]">
          <p className="w-[180px] ml-[20px]">{t.exercise.name}</p>
          <p className="w-[100px] ml-[50px]">{t.weight}</p>
          <p className="w-[90px] ml-[40px]">{t.reps}</p>
        </div>
      ))}
    </div>
  );
}
