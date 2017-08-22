module.exports = function(app){
  require('./login')(app);
  require('./logout')(app);
  require('./register')(app);
  require('./upload')(app);
  require('./upload_image')(app);
  require('./admin')(app);
  require('./like')(app);
  require('./check')(app);
  require('./home')(app);
  require('./upload_compress')(app);
};
