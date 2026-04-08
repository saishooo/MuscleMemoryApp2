// src/app/record/goal/output/goalRecordsList.tsx
// 設定した目標確認を表示する

//Goalテーブルの型定義
type Goal = {
  id: string;
  userId: string;
  exercise: {
    id: string;
    name: string;
  };
  exerciseId: string;
  targetWeight: number;
  targetReps: number;
  deadline: Date | null;
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
  goals: Goal[];
  exercises: Exercises[];
};

export default function GoalRecordsList({ goals, exercises }: Props) {
  if (goals.length === 0) {
    return <p>目標がありません</p>;
  }

  return (
    <div className="h-[340px] overflow-y-auto">
      {goals.map((t, index) => {
        let formattedDate = "";

        if (t.deadline !== null) {
          const deadline = new Date(t.deadline);
          formattedDate = `${deadline.getMonth() + 1}月${deadline.getDate()}日`;
        }

        return (
          <div key={t.id}>
            <div className="flex w-full mt-[10px]">
              <p className="w-[90px] ml-[7px]">{formattedDate}</p>
              <p className="w-[180px] ml-[5px]">{t.exercise.name}</p>
              <p className="w-[50px] ml-[5px]">{t.targetWeight}</p>
              <p className="w-[50px] ml-[15px]">{t.targetReps}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
