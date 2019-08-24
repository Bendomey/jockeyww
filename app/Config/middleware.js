class Middleware{
    static ensureAuthenticated(req, res, next){
      if(req.isAuthenticated()){
        return next();
      }
      req.session.redirect_to = req.path;
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    }
  
    static forwardAuthenticated(req, res, next){
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/')
    }
  }
  
  export default Middleware