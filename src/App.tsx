import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";

// 训练周期：2025/4/23 – 2025/4/30
type Record = {
  id: number;
  date: string; // YYYY-MM-DD
  label: string; // 4月23日（周三）
  title: string;
  workout: string;
  goal: string;
  done: boolean;
  actualTime: string;
};

const PLAN: Omit<Record, "done" | "actualTime">[] = [
  {
    id: 1,
    date: "2025-04-23",
    label: "4月23日（周三）",
    title: "间歇训练",
    workout: "6 × 400m @ 1分45秒，间歇慢跑200m",
    goal: "增强乳酸耐受，冲击高配速",
  },
  {
    id: 2,
    date: "2025-04-24",
    label: "4月24日（周四）",
    title: "轻松跑 + 核心训练",
    workout: "3km @ 6分/km + 平板支撑2×1分钟",
    goal: "恢复性训练，提升心肺和核心",
  },
  {
    id: 3,
    date: "2025-04-25",
    label: "4月25日（周五）",
    title: "节奏跑",
    workout: "1km 热身 + 2km @ 5分/km + 1km 慢跑",
    goal: "中等强度，模拟比赛中段",
  },
  {
    id: 4,
    date: "2025-04-26",
    label: "4月26日（周六）",
    title: "轻松跑",
    workout: "2km @ 6分/km + 动态拉伸",
    goal: "放松肌肉、促进恢复",
  },
  {
    id: 5,
    date: "2025-04-27",
    label: "4月27日（周日）",
    title: "模拟考试",
    workout: "全力跑 1500m 计时",
    goal: "初步测试进展，查找配速节奏问题",
  },
  {
    id: 6,
    date: "2025-04-28",
    label: "4月28日（周一）",
    title: "冲刺间歇",
    workout: "4 × 200m @ 接近全速，间歇慢走100m",
    goal: "激发神经肌肉反应，提升速度爆发",
  },
  {
    id: 7,
    date: "2025-04-29",
    label: "4月29日（周二）",
    title: "休息 / 轻松慢跑",
    workout: "1.5~2km @ 6分半/km",
    goal: "保持血液循环，避免疲劳积累",
  },
  {
    id: 8,
    date: "2025-04-30",
    label: "4月30日（周三）",
    title: "考前热身",
    workout: "慢跑1km + 动态拉伸 + 心理暗示",
    goal: "激活身体，保持状态",
  },
];

export default function App() {
  const [records, setRecords] = useState<Record[]>(() => {
    const cached = localStorage.getItem("runRecords_20250423");
    return cached
      ? JSON.parse(cached)
      : PLAN.map((p) => ({ ...p, done: false, actualTime: "" }));
  });

  useEffect(() => {
    localStorage.setItem("runRecords_20250423", JSON.stringify(records));
  }, [records]);

  const toggleDone = (id: number) => {
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r)));
  };

  const updateTime = (id: number, value: string) => {
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, actualTime: value } : r)));
  };

  const progress = Math.round((records.filter((r) => r.done).length / records.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">1500m 提速训练 · 打卡（4/23 – 4/30）</h1>
      <Progress value={progress} className="h-4" />
      <p className="text-center text-sm text-gray-600">完成度 {progress}%</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((rec) => (
          <Card key={rec.id} className={rec.done ? "border-green-500" : ""}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">{rec.label} · {rec.title}</h2>
                <Button variant="ghost" size="icon" onClick={() => toggleDone(rec.id)}>
                  {rec.done ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-700">{rec.workout}</p>
              <p className="text-xs text-gray-500">{rec.goal}</p>
              <div className="flex items-center space-x-2 pt-2">
                <Input
                  placeholder="实际完成时间 (mm:ss)"
                  value={rec.actualTime}
                  onChange={(e) => updateTime(rec.id, e.target.value)}
                  disabled={rec.done}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {progress === 100 && (
        <div className="p-4 bg-green-100 rounded-xl text-center shadow">
          <h3 className="font-bold text-green-700">恭喜！全部打卡完成 🎉</h3>
          <p className="text-sm text-green-600">保持状态，补考日全力冲刺，目标 7:00 以内！</p>
        </div>
      )}
    </div>
  );
}
