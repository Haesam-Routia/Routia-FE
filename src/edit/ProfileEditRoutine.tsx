import { useEffect, useState } from "react";
import { ChipSelect, SelectableList } from "../components/onboarding";
import EditLayout from "../components/EditLayout";
import {
  DIFFICULTY_BY_VALUE,
  DIFFICULTY_VALUE_BY_CODE,
  TIME_PREFERENCE_BY_LABEL,
  TIME_PREF_LABEL_BY_CODE,
  getCurrentUserId,
  getNeeds,
  updateNeeds,
  type NeedsUpdateRequest,
} from "../api";
import { tryApi } from "../api/netguard";

export default function ProfileEditRoutine() {
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [timePref, setTimePref] = useState("");

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId == null) return;
    void tryApi(() => getNeeds(userId), null).then((n) => {
      if (!n) return;
      if (n.routineDifficulty && DIFFICULTY_VALUE_BY_CODE[n.routineDifficulty]) {
        setDifficulty([DIFFICULTY_VALUE_BY_CODE[n.routineDifficulty]]);
      }
      if (n.routineTimePreference && TIME_PREF_LABEL_BY_CODE[n.routineTimePreference]) {
        setTimePref(TIME_PREF_LABEL_BY_CODE[n.routineTimePreference]);
      }
    });
  }, []);

  const handleSave = async () => {
    const userId = getCurrentUserId();
    if (userId == null) return;
    const body: NeedsUpdateRequest = {};
    const diff = difficulty[0];
    if (diff && DIFFICULTY_BY_VALUE[diff]) body.routineDifficulty = DIFFICULTY_BY_VALUE[diff];
    if (timePref && TIME_PREFERENCE_BY_LABEL[timePref]) {
      body.routineTimePreference = TIME_PREFERENCE_BY_LABEL[timePref];
    }
    await tryApi(() => updateNeeds(userId, body), null);
  };

  return (
    <EditLayout active="routine" onSave={handleSave}>
      <SelectableList
        label="루틴 난이도"
        required
        options={[
          {
            value: "complex",
            label: "루틴이 복잡해도 괜찮아요",
            desc: "자세한 단계별 루틴을 원해요 (12개의 루틴 생성)",
          },
          {
            value: "medium",
            label: "루틴이 너무 복잡한건 싫어요",
            desc: "핵심 단계만 간단하게 원해요 (6~7개의 루틴 생성)",
          },
          {
            value: "simple",
            label: "루틴이 단순했으면 좋겠어요",
            desc: "최소한의 루틴만 원해요 (3개의 루틴 생성)",
          },
        ]}
        value={difficulty}
        onChange={setDifficulty}
        itemClassName="w-[359px] h-[60px]"
      />

      <ChipSelect
        label="루틴 선호 시간대"
        required
        options={["아침형", "저녁형", "상관없음"]}
        value={timePref}
        onChange={setTimePref}
        itemClassName="px-4 h-[41px]"
      />
    </EditLayout>
  );
}
