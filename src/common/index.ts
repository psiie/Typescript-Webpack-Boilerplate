
function safeParse(str: string): Object {
  let json: Object = {};
  try {
    json = JSON.parse(str);
  } catch (error) {
    json = {};
  }
  return json;
}
