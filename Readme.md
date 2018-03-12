# Task 2

## Lines Chart creation

The aim of this task is to create a Line chart adding dots and interaction (whenever we click on the dots display information):

![alt text](https://github.com/Chopinantonio/Modulo-07----Tarea-2/blob/master/Pictures/completedgraph.png)

### Let´s see the steps to create that:

#### 1) Data

In this case, we are going to use the following data:

![alt text](https://github.com/Chopinantonio/Modulo-07----Tarea-2/blob/master/Pictures/data.png)


#### 2) Select the svg node

Let´s add the SVG element with the new width and height, and translate the origins applying the margins.

![alt text](https://github.com/Chopinantonio/Modulo-07----Tarea-2/blob/master/Pictures/svgnode.png)

#### 3) Build X and Y axis

We set up the scale of each axis of coordinates. We want on the Y axis the vaules of "Sales", so we have a domain of [0, maxSales]. On the other hand, we want on X axis the different months we have taken into account in this task. Let´s see the code we have used for this:

![alter text](https://github.com/Chopinantonio/Modulo-07----Tarea-2/blob/master/Pictures/axisXY.png)

#### 4) Build the lines

Now, it´s time to create the lines of the graph. First of all, we create a variable which define the line. After that, we add the valueline path. Let´s see the code used in this step:

![alter text](https://github.com/Chopinantonio/Modulo-07----Tarea-2/blob/master/Pictures/lines.png)

#### 5) Add dots and interaction

Finally, let's add a function that should allow us to obtain information whenever we click on. In order to achive that, we will create the following "tooltip". A tooltip is a tool of visual help, which works showing information when the cursor is placed on a graphical element.

![alter text](https://github.com/Chopinantonio/Modulo-07----Tarea-2/blob/master/Pictures/tooltip.png)


Now we create a function which by using this tooltip, shows the information of each point selected:

![alter text](https://github.com/Chopinantonio/Modulo-07----Tarea-2/blob/master/Pictures/mouse.png)

First, we define the dots on each value of our data in our lines graph. After that, we define how to show the tooltip that gives us the information about each point. Let´s see how works that visual tool:

![alter text](https://github.com/Chopinantonio/Modulo-07----Tarea-2/blob/master/Pictures/mouseover.png)


## THE END -- José Antonio Montes Cervantes
