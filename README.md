pictogram
=========

Basic Requirement:
- Build a chart with custom icons - DONE
- Build an editor to accommodate the chart - DONE
- The chart can be moved around freely in the editor - DONE
- The chart can be resized freely in the editor - DONE
- User can insert data to the chart as desired - DONE
- User can edit data of the chart after initial creation - DONE
- User can change colors of the icons of the chart - DONE
- User can change the icons for the chart (e.g. men, women, etc.) - DONE
- Example: Man Utd 7, Chelsea 3 -> 7 icons colored in a certain color, 3 icons colored in a different color
- Also known as a pictogram

Advanced Requirement:
- Editor able to create more multiple charts, and each are independent to any other
- Able to publish the whole editor as an image to social network (e.g. Pinterest)

Important Note:
- Take care not to have any memory leaks - DONE with simple logic flow
- Performance must not be laggy - DONE using SVG over Canvas
- Bug free - :)
- Cross browser compatibility (except IE9 and below) - TESTED at FF & Chrome
- Strictly no libraries or framework can be used (e.g. no JQuery, Bootstrap, D3.js etc) - Vanilla JS :)
- Exception of API is allowed for social network publishing only (e.g. Pinterest API)
- Please explain your workflow for your code as well - Please see below.
- If, by any chance, you are not able to complete a particular task, do explain why and what are the challenges you face? - Time shortage



WORK-FLOW
=========
- Investigation about Canvas & learned/develop images handling
- Canvas seems not a good choice for this specific use-case because it;s does not save reference of rendered itmes
- Investigation about SVG & learned/develop imagse handling
- Save reference of rendered items but still have some gotchas
- Designed basic UI for Pictogram
- Architectural planning for logic flow


Execution
=========
You need to execute these files from localhost server - because this project has AJAX requests

- Ruby guys can use - https://github.com/TimMoore/dotfiles/blob/master/.bashrc.d/serve.bash
- I am using this script - https://github.com/cowboy/dotfiles/blob/master/bin/serve for Ubuntu 14.04


TODOs
=======
- Two way data binding : SVG <--- Data ---> Controls
- ...