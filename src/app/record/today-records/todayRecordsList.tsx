type Training = {
  id: number;
  sessionId: number;
  exerciseId: number;
  weight: number;
  reps: number;
  createdAt: Date;
};

//Exrcisesテーブルの型定義
type Exercises = {
  id: number;
  name: string;
  categoryId: number;
};

type Props = {
  trainings: Training[];
  exercises: Exercises[];
};

export default function TodayRecordsList({ trainings, exercises }: Props) {
  if (trainings.length === 0) {
    return <p>記録がありません</p>;
  }

  return (
    <div>
      {trainings.map((t) => (
        <div key={t.id}>
          <p>{t.exerciseId}</p>
          <p>{t.weight}</p>
          <p>{t.reps}</p>
        </div>
      ))}
    </div>
  );
}
