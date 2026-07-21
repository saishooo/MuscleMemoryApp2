"use client"

import Image from "next/image";

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

type Props = {
    records: Record[],
};

export default function WeekTraining({ records }: Props){

    return (
        <div className="h-45 w-110 border rounded-xl shadow">
            <p className="w-full h-10 pl-4 pt-4 font-bold">今週のトレーニング</p>
            <div className="flex justify-evenly pt-7">

                <div className="text-center">
                    <p>月</p>
                    <Image
                        src="/check.png"
                        alt="check"
                        width={40}
                        height={40}
                        className="pt-2"
                    />
                </div>

                <div className="text-center">
                    <p>火</p>
                    <Image
                        src="/checked.png"
                        alt="check"
                        width={40}
                        height={40}
                        className="pt-2"
                    />
                </div>

                <div className="text-center">
                    <p>水</p>
                    <Image
                        src="/check.png"
                        alt="check"
                        width={40}
                        height={40}
                        className="pt-2"
                    />
                </div>

                <div className="text-center">
                    <p>木</p>
                    <Image
                        src="/checked.png"
                        alt="check"
                        width={40}
                        height={40}
                        className="pt-2"
                    />
                </div>

                <div className="text-center">
                    <p>金</p>
                    <Image
                        src="/check.png"
                        alt="check"
                        width={40}
                        height={40}
                        className="pt-2"
                    />
                </div>

                <div className="text-center">
                    <p>土</p>
                    <Image
                        src="/checked.png"
                        alt="check"
                        width={40}
                        height={40}
                        className="pt-2"
                    />
                </div>

                <div className="text-center">
                    <p>日</p>
                    <Image
                        src="/checked.png"
                        alt="check"
                        width={40}
                        height={40}
                        className="pt-2"
                    />
                </div>
                
            </div>

        </div>
    );
}