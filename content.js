// content.js
// content.js
// const targetDomain = 'uat.fealtyx.com'; // Correct value

// if (window.location.hostname === targetDomain) {
//   const key = 'userdata'; // Replace with your actual local storage key
//   const data = localStorage.getItem(key);
//   if (data) {
//     try {
//       const parsedData = JSON.parse(data);
//       const entityName = parsedData.EntityName;
//       console.log('Entity Name from local storage:', entityName); // Debugging

//       chrome.runtime.sendMessage({
//         type: 'fetchEntityName',
//         data: {
//           entityName: entityName
//         }
//       });
//     } catch (e) {
//       console.error('Error parsing local storage data:', e);
//     }
//   } else {
//     console.log('No data found in local storage for key:', key);
//   }
// } else {
//   console.log('Not the target domain:', window.location.hostname); // Debugging
// }
const targetDomain = 'uat.fealtyx.com'; // Correct value
const key = 'userdata'; // Replace with your actual local storage key
const ent = '';
if (window.location.hostname === targetDomain) {
  // console.log("Starting interval to scan localStorage every 10 seconds.");

  setInterval(() => {
    const data = localStorage.getItem(key);
    
    if (data) {
        const parsedData = JSON.parse(data);
        const entityName = parsedData.EntityName;
        // console.log('Entity Name from local storage:', entityName); // Debugging

        // Save to Chrome storage
        chrome.storage.local.set({ entityName: entityName }, function() {
          // console.log('Entity name saved to chrome.storage:', entityName); // Debugging
        });
      
    } else {
      chrome.storage.local.set({ entityName: ent});
      // console.log('No data found in local storage for key:', key);
    }
  }, 5000); // 10000 ms = 10 seconds

} else {
  // console.log('Not the target domain:', window.location.hostname); // Debugging
}

console.log("Content script loaded.");

function queryXPath(xpath, contextNode = document) {
  const evaluator = new XPathEvaluator();
  const result = evaluator.evaluate(
    xpath,
    contextNode,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  return result.singleNodeValue;
}

function dispatchInputEvent(element) {
  const event = new Event("input", { bubbles: true });
  element.dispatchEvent(event);
  element.dispatchEvent(new Event("change", { bubbles: true }));
}

function setFieldValue(selector, value, setFieldFunction) {
  const field = queryXPath(selector);
  if (field) {
    console.log(`${selector} field found.`);
    setFieldFunction(field, value);
    return true;
  }
  console.log(`${selector} field not found.`);
  return false;
}

async function clickElement(selector) {
  const element = queryXPath(selector);
  if (element) {
    console.log(`${selector} found, clicking.`);
    element.click();
    return true;
  }
  console.log(`${selector} not found.`);
  return false;
}

async function clickElementByTitle(title) {
  console.log(title);
  const element = document.querySelector(`[title='${title}]`);
  if (element) {
    console.log(`Element with title '${title}' found.`);
    element.click();
    return true;
  }
  console.log(`Element with title '${title}' not found.`);
  return false;
}

async function automate() {
  if (
    await clickElement(
      '//*[@id="react-root"]/div/div[2]/div[1]/div[2]/nav/div/div[6]/a[1]'
    )
  ) {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for page transition
    if (await clickElement("/html/body/div[6]/div/button[1]")) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for elements to be interactive
      if (
        await clickElement(
          "/html/body/div[1]/div/div[2]/div[1]/main/div[2]/div/div[1]/div/div/div/div/div[2]/div[1]/div"
        )
      ) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (
          setFieldValue(
            "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div[1]/div[1]/div[2]/div/input",
            "harshofferfi",
            (field, value) => {
              field.value = value;
              dispatchInputEvent(field);
            }
          )
        ) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          if (
            setFieldValue(
              "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div[2]/div[1]/div[2]/div/input",
              "offer display text",
              (field, value) => {
                field.value = value;
                dispatchInputEvent(field);
              }
            )
          ) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (
              setFieldValue(
                "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div[3]/div[1]/div[2]/div/textarea",
                "first condition values",
                (field, value) => {
                  field.value = value;
                  dispatchInputEvent(field);
                }
              )
            ) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              if (
                await clickElement(
                  "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div[4]/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button"
                )
              ) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                if (
                  await clickElement(
                    "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div[4]/div/div[2]/div/div/div/button[2]"
                  )
                ) {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  if (
                    await clickElement(
                      "/html/body/div[8]/div/div[2]/div[2]/div[2]/div/button"
                    )
                  ) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    if (
                      await clickElement(
                        "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button"
                      )
                    ) {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      if (
                        await clickElement(
                          "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div/div/div/div[2]/div/div/div/button[2]"
                        )
                      ) {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                        if (
                          setFieldValue(
                            "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div/div[2]/div[1]/div[2]/div/input",
                            "5000",
                            (field, value) => {
                              field.value = value;
                              dispatchInputEvent(field);
                            }
                          )
                        ) {
                          await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                          );
                          if (
                            setFieldValue(
                              "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div/div[4]/div[1]/div[2]/div/input",
                              "414",
                              (field, value) => {
                                field.value = value;
                                dispatchInputEvent(field);
                              }
                            )
                          ) {
                            await new Promise((resolve) =>
                              setTimeout(resolve, 1000)
                            );
                            if (
                              await clickElement(
                                "/html/body/div[8]/div/div[2]/div[2]/div[2]/div/button[2]"
                              )
                            ) {
                              await new Promise((resolve) =>
                                setTimeout(resolve, 1000)
                              );
                              if (
                                await clickElement(
                                  "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button"
                                )
                              ) {
                                await new Promise((resolve) =>
                                  setTimeout(resolve, 1000)
                                );
                                if (
                                  await clickElement(
                                    "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div/div/div[2]/div/div/div/button[2]"
                                  )
                                ) {
                                  await new Promise((resolve) =>
                                    setTimeout(resolve, 1000)
                                  );
                                  if (
                                    await clickElement(
                                      "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div[2]/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button"
                                    )
                                  ) {
                                    await new Promise((resolve) =>
                                      setTimeout(resolve, 1000)
                                    );
                                    if (
                                      await clickElement(
                                        "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div[2]/div/div[2]/div/div/div/button[1]"
                                      )
                                    ) {
                                      await new Promise((resolve) =>
                                        setTimeout(resolve, 1000)
                                      );
                                      if (
                                        await clickElement(
                                          "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div[3]/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button"
                                        )
                                      ) {
                                        await new Promise((resolve) =>
                                          setTimeout(resolve, 1000)
                                        );
                                        if (
                                          await clickElement(
                                            "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div[3]/div/div[2]/div/div/div/button[4]"
                                          )
                                        ) {
                                          await new Promise((resolve) =>
                                            setTimeout(resolve, 1000)
                                          );
                                          if (
                                            await clickElement(
                                              "/html/body/div[8]/div/div[2]/div[2]/div[2]/div/button[2]"
                                            )
                                          ) {
                                            await new Promise((resolve) =>
                                              setTimeout(resolve, 100)
                                            );
                                            {
                                              await new Promise((resolve) =>
                                                setTimeout(resolve, 300)
                                              );
                                              {
                                                await new Promise((resolve) =>
                                                  setTimeout(resolve, 300)
                                                );
                                                
                                                {
                                                  await new Promise((resolve) =>
                                                    setTimeout(resolve, 300)
                                                  );
                                                  if (
                                                    await clickElement(
                                                      "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div/div[3]/div[2]/div[1]/div/div/input"
                                                    )
                                                  ) {
                                                    await new Promise(
                                                      (resolve) =>
                                                        setTimeout(
                                                          resolve,
                                                          3000
                                                        )
                                                    );
                                                    // end date
                                                    if (
                                                      await clickElement(
                                                        "/html/body/div[9]/div/div/div/div/div[2]/div[2]/table/tbody/tr[4]/td[5]/div"
                                                      )
                                                    ) {
                                                      await new Promise(
                                                        (resolve) =>
                                                          setTimeout(
                                                            resolve,
                                                            3000
                                                          )
                                                      );
                                                      if (
                                                        await clickElement(
                                                          "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div/div[4]/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button"
                                                        )
                                                      ) {
                                                        await new Promise(
                                                          (resolve) =>
                                                            setTimeout(
                                                              resolve,
                                                              1000
                                                            )
                                                        );
                                                        if (
                                                          await clickElement(
                                                            "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div/div[4]/div/div[2]/div/div/div/button[3]"
                                                          )
                                                        );
                                                        await new Promise(
                                                          (resolve) =>
                                                            setTimeout(
                                                              resolve,
                                                              1000
                                                            )
                                                        );
                                                        if (
                                                          await clickElement(
                                                            "/html/body/div[8]/div/div[2]/div[2]/div[2]/div/button[2]"
                                                          )
                                                        ) {
                                                          await new Promise(
                                                            (resolve) =>
                                                              setTimeout(
                                                                resolve,
                                                                1000
                                                              )
                                                          );
                                                          if (
                                                            await clickElement(
                                                              "/html/body/div[8]/div/div[2]/div[1]/div/main/form/div/div/div/div/div/div/div/div/label/div/div/div[1]"
                                                            )
                                                          ) {
                                                            await new Promise(
                                                              (resolve) =>
                                                                setTimeout(
                                                                  resolve,
                                                                  1000
                                                                )
                                                            );
                                                            if (
                                                              await clickElement(
                                                                "/html/body/div[8]/div/div[2]/div[2]/div[2]/div/button[2]"
                                                              )
                                                            ) {
                                                              // await new Promise(resolve => setTimeout(resolve, 1000));
                                                              console.log(
                                                                "automation complete"
                                                              );
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

automate();
