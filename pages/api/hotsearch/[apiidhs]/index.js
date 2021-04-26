import query from '../../ApiConst/connection';


export default async function (req, res) {
    const {apiidhs} = req.query;
    
    let results = await query("SELECT * FROM `hot-search` WHERE id=?",[apiidhs]);
    for(let i in results) {
        const row = results[i];
        const articles = await query("SELECT * FROM `hs-articles` WHERE idhotsearch = ?",[row.id])
        results[i].articles = articles;
    }
    if(results.length > 0 ){
        res.status(200).json({data:results[0]});
    }else{
        res.status(200).json({data:null});
    }
    
}