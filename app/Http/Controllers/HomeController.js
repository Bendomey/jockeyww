
class HomeController {
    static index(req, res){
        res.render('Client/index',{
        	title:'Welcome'
        });
    }

    static about(req, res){
        res.render('Client/about',{
        	title:'About Us'
        });
    }

    static contact(req, res){
        res.render('Client/contact',{
        	title:'Contact Us'
        });
    }

    static dj(req, res){
        res.render('Client/dj',{
        	title:'Djs'
        });
    }

    static event(req, res){
        res.render('Client/event',{
        	title:'Events'
        });
    }
}

export default HomeController