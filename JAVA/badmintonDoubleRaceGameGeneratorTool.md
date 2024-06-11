

```java

package cn.badminton.tool.tools;

import jakarta.annotation.Nullable;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 双打比赛生成对阵
 * 直接生成对阵
 *
 * @param <T>
 */
public class BadmintonDoubleRaceGeneratorTool<T> {

    /**
     * 参赛人列表
     */
    private List<T> participations = new ArrayList<>();

    /**
     * 每人上场次数
     */
    private Integer everyoneRoundNum;

    /**
     * 场地数
     */
    private Integer venueNum;

    /**
     * 总比赛场数 = A*(A-1)/4，A为参数选手人数，（A-1）每人上场次数
     * 双打4人起步
     * 4、5、8人时，每人上场次数 A-1，
     * 6、7人时，6人：可选4、6、9；7人时：选8、12。
     * 8人以上时，默认每人上场次数 8
     */
    private Integer raceAllRoundNum;

    /**
     * // 创建一个池，每个人总共 everyoneRoundNum 次，每分配一次 -1
     */
    private LinkedHashMap<T, Integer> playerPool;

    /**
     * 已经组合过的搭档
     */
//    private Set<List<T>> usedPartnerSet;
    public BadmintonDoubleRaceGeneratorTool(List<T> participations,
                                            Integer everyoneRoundNum,
                                            Integer venueNum) {
        this.participations = participations;
        this.everyoneRoundNum = everyoneRoundNum;
        this.venueNum = venueNum;

        this.playerPool = new LinkedHashMap<>();
        for (T value : participations) {
            playerPool.put(value, everyoneRoundNum);
        }
//        this.usedPartnerSet = new HashSet<>();
    }

    public List<List<List<T>>> generatorBattle() {
        // 最终对阵结果
        List<List<List<T>>> battleList = new ArrayList<>();

        List<T> allPlayers = new ArrayList<>(participations);

        // 总场次
        raceAllRoundNum = participations.size() * (everyoneRoundNum) / 4;

        for (Integer i = 0; i < raceAllRoundNum; ) {
            List<T> thisRoundPlayerPool = new ArrayList<>(); // 本轮选手池，该轮出现过的选手不能再出场
            // 每完成一次（venueNum）场地配分为一轮
            for (Integer v = 0; v < venueNum; v++) {
                List<T> tempPlayers = allPlayers.stream().filter(p -> playerPool.get(p) > 0).collect(Collectors.toList());
                if (tempPlayers.isEmpty()) {
                    break;
                }
                // 先按剩余上场次数 从大到小 排序
                tempPlayers.sort(new Comparator<T>() {
                    @Override
                    public int compare(T o1, T o2) {
                        Integer r1 = playerPool.get(o1);
                        Integer r2 = playerPool.get(o2);
                        return r2 - r1;
                    }
                });
                for (T t : thisRoundPlayerPool) {
                    tempPlayers.remove(t);// 除非上场次数为0，后续得加回来
                }

                List<T> fs = get4Players(tempPlayers);
                if (fs.isEmpty()) {
                    return battleList;
                }
                List<List<T>> tempOneBattle = new ArrayList<>();
                T p1 = fs.get(0);
                T p2 = fs.get(1);
                T p3 = fs.get(2);
                T p4 = fs.get(3);
                List<T> firstPartner = new ArrayList<>();
                // p1 p2 一组，p3 p4一组，这样组合最后一组总是重复，然后报错
                // p1 p3 一组，p2 p4一组，这样组合每次间隔都是刚好
                firstPartner.add(p1);
                firstPartner.add(p3);
                List<T> secondPartner = new ArrayList<>();
                secondPartner.add(p2);
                secondPartner.add(p4);
                tempOneBattle.add(firstPartner);
                tempOneBattle.add(secondPartner);
//                usedPartnerSet.add(firstPartner);
//                usedPartnerSet.add(secondPartner);

                battleList.add(tempOneBattle);

                thisRoundPlayerPool.clear();
                thisRoundPlayerPool.add(p1);
                thisRoundPlayerPool.add(p2);
                thisRoundPlayerPool.add(p3);
                thisRoundPlayerPool.add(p4);

                i++;
                System.out.println(String.format("第%s轮第%s场 总场次第%s场，%s-%s VS %s-%s", ((i - 1) / venueNum) + 1, v + 1, i, p1, p2, p3, p4));
            }
        }

        return battleList;
    }

    /**
     * 获取4位选手
     *
     * @param list
     * @return
     */
    private List<T> get4Players(List<T> list) {
        List<T> fs = new ArrayList<>();
        Integer index = 0;
        while (fs.size() < 4) {
            T p = getRoundHighPlayer(list, index);
            Integer roundNum = playerPool.get(p);
            // 上场次数为0不能上场
            if (roundNum <= 0) {
                index++;
                continue;
            }
//            if (fs.size() == 1 || fs.size() == 3) {
            // 这里逻辑是判断 p1 p2一组或p3 p4一组，是否有重复。
            // 在 p1 p3一组;p2 p4 一组的情况下没用
//                T t1 = fs.get(fs.size() - 1);
//                List<T> objects = new ArrayList<>(2);
//                objects.add(t1);
//                objects.add(p);
//                boolean contains = usedPartnerSet.contains(objects);
//                boolean equals = t1.equals(p);
//                if (contains || equals) {
//                    index++;
//                    continue;
//                }
//            }
            boolean contain = isContain(fs, p);
            if (contain) {
                index++;
                continue;
            }
            fs.add(p);
            roundNum--;
            playerPool.put(p, roundNum);
        }
        return fs;
    }

    private T getRoundHighPlayer(List<T> list, @Nullable Integer index) {


        // 按分数分组，同分的打乱，再按从大到小排。
        Map<Integer, List<T>> listMap =
                list.stream().collect(Collectors.groupingBy(item -> playerPool.get(item)));

        Set<Integer> keySet = listMap.keySet();
        Integer[] array = keySet.toArray(Integer[]::new);

        SortTool.insertionSort(array);

        List<T> listss = new ArrayList<>();
        for (Integer i : array) {
            List<T> ts = listMap.get(i);
            // 加上随机后 出场间隔要么太久 要么连着上
//            Collections.shuffle(ts);
            listss.addAll(ts);
        }
        Collections.reverse(listss);
        T p = listss.get(index);
        return p;
    }

    private boolean isContain(List<T> list, T p) {
        for (T t : list) {
            if (t.equals(p)) {
                return true;
            }
        }
        return false;
    }


}

```