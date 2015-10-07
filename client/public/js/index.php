$config = new Config(array(
   'tempDir' => './chunks_temp_folder'
));
$request = new Request();
if (\Flow\Basic::save(__DIR__ . '/' . $request->getFileName(), $config, $request)) {
  echo "Hurray, file was saved in " . __DIR__ . '/' . $request->getFileName();
}
// In most cases, do nothing, \Flow\Basic handles all errors
