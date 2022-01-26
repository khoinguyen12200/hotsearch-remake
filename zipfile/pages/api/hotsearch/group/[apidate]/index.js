import query from '../../../ApiConst/connection';


export default async function (req, res) {
    const {apidate} = req.query;
    
    let results = await query("SELECT * FROM `hot-search` WHERE date(date) = date(?)",[apidate]);
    for(let i in results) {
        const row = results[i];
        const articles = await query("SELECT * FROM `hs-articles` WHERE idhotsearch = ?",[row.id])
        results[i].articles = articles;
    }
    res.status(200).json({data:results});
    
}