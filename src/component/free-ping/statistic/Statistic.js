import StatisticByMonth from "./StatisticByMonth";
import StatisticByYear from "./StatisticByYear";

export default function ({pageId, pingId}) {

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
                <StatisticByMonth pageId={pageId} pingId={pingId}/>
            </div>
            <div className="col-span-1">
                <StatisticByYear pageId={pageId} pingId={pingId}/>
            </div>
        </div>
    );
}