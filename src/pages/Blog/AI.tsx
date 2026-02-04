import "../HomePage.css";
import "./Blog.css";

export default function AIPage() {
  return (
    <div>
      <h1 className="header">Trying to understand AI</h1>
      <div className="contents">
        <p>
          When I first encountered AI chatbots, it was genuinely very
          impressive. Being able to engage in a conversation with a chef,
          fitness coach, language expert... all at once felt unbelievable. This
          was also the time I started to hear about the general negative
          rhetoric about AI and it left an unpleasant feeling. However, to
          completely disregard the scientific progress right before our eyes,
          felt wasteful in and of itself. I wanted to understand the mechanics
          behind this progress both in a theoretic and practical way. Lets
          begin!
        </p>
        <h2>Developing a Neural Network</h2>
        <img
          src="/images/ai-blog/neuralnetworkvisual.png"
          className="img"
          title="Image from GeeksForGeeks"
        />
        <p>
          A core concept with AI is the use of Neural Networks. Built to mimic
          the complex mechanisms within our brains that allow us to be
          essentially, a species of predictors. Our brains are continuously
          trained on our sensory input so that our prediction stats are maxxed
          out. It's why we have that sixth sense feeling, why we aren't good at
          handling big changes, and why it feels strange to get onto a
          stationary escalator. Neural networks have derived its fundamentals to
          be that of a master predicator, which comes with all its pros and also
          cons.
        </p>
        <p>
          I will explain how we can code a neural network (NN) to recognise
          images and the number it shows. Specifically, the MNIST database
          <a href="#fn-1" id="ref-1" className="footnote">
            <sup>1</sup>
          </a>{" "}
          will be used to train the NN to determine the number in the given
          image. This is seen as the simplest example for neural networks, a
          "Hello World!" if you will. It will be written in Python and use the
          numpy library
          <a href="#fn-2" id="ref-2" className="footnote">
            <sup>2</sup>
          </a>
          {". "}
        </p>
        <h3>Inputs and Outputs</h3>
        <img
          src="/images/ai-blog/pixeldataforimage.png"
          className="imgS"
          title="Image from 3Blue1Brown"
        />
        <p>
          You always want to start off by determining your inputs and outputs.
          Our computer can only 'see' (read) the pixels of the image and their
          rgb/a values which means they will be our inputs. The image above
          shows exactly how the 28x28 pixels make up an example image. Where
          values closer to 0 are darker and values closer to 1 are lighter.
        </p>
        <img
          src="/images/ai-blog/gettingtrainingdata.png"
          className="imgC"
          title="getting training data"
        />
        <p>
          As I said, I will be using the MNIST database to source 70,000 of
          these images of handwritten digits. I will obtain these through the
          scikit-learn library. By setting `as_frame` to false and parser to
          `liac-arff`, the training_images/training_labels will be numpy arrays
          and the data will only contain numerical values. The training_labels
          is another array which contains the corresponding digit for each image
          in the database.
        </p>
        <img
          src="/images/ai-blog/normalisetraining.png"
          className="imgC"
          title="normalising training data"
        />
        <p>
          An important step with our image data is to normalise the values (put
          into a [0,1] range like the one in the image). There are a number of
          reasons for this, it ensures a consistent scale across all input
          features, helps gradient descent algorithms, and works better with
          activation functions. We will look at gradient descent and activation
          functions later on. To do this, I divide all the values by 255, which
          is the maximum RGB value, [0,256).
        </p>
        <img
          src="/images/ai-blog/inputoutput.png"
          className="imgS"
          title="Image from 3Blue1Brown"
        />
        <p>
          In terms of the output to our NN it will be a single vector with the
          number of possible digits as its length. When we begin training, we
          should think of the NN as a baby with very little idea as to what the
          digit is. However, eventually the NN should learn about the images and
          produce high confidence values (~1) for the digit it determines as
          correct and low confidence values for all the other digits (~0). So
          looking at the image above, imagine next to each digit in the output
          vector a number in the range [0,1] that represents how confident the
          NN is with the input being that value.
        </p>
        <h3>Neural Network Layers</h3>
        <p>
          Currently, our image of the network shows a number of layers each with
          lots of neurons and connections between them. I will start by focusing
          on a single layer in the network. There are different types of layers,
          the main one to think about is a fully connected layer. As the name
          suggests, every neuron from the previous layer has a connection with
          each neuron of the current layer. Each neuron simply holds a 'weight'
          value for each of the previous neurons and also a single 'bias' value.
          So the input to a single neuron are all the outputs from all the
          previous neurons (lets call this `x`). The output of a neuron is an
          affine transformation where we multiply the `x` with the weight values
          values and then add the bias value afterwards.
        </p>
        <img
          src="/images/ai-blog/layerclassinit.png"
          className="imgC"
          title="Initialising layer class"
        />
        <p>
          I have already mentioned there are multiple types of layers so I will
          begin by creating an abstract class for a layer. It will define the
          function signatures and the main instance variables associated with a
          layer. I have defined a function signature for `feed_forward`, which
          takes a matrix and outputs a matrix. This will be defined for each
          type of layer and represents the flow of data through a single layer.
        </p>
        <img
          src="/images/ai-blog/fullyconnectedinit.png"
          className="imgC"
          title="Initialising FullyConnectedLayer"
        />
        <p>
          Here I have defined the FullyConnected class as a child of Layer. We
          have two parameters: input_size - number of neurons in previous layer,
          output_size - number of neurons for the current layer. We call the
          parent's constructor and then initialise the weights and bias
          matrices. There is more research on how to initialise weights and how
          they are context specific and often synergise with other parts of the
          NN. Here, I decided to use the 'He initialisation' which will randomly
          initialise the weights for each neuron in this fully connected layer
          from a normal distribution shifted with a variance of 2.0 /
          input_size. The bias values are initialised to 1 as the randomness is
          handled with the weights.
        </p>
        <img
          src="/images/ai-blog/fullycfeedforward.png"
          className="imgC"
          title="feed forward function"
        />
        <p>
          As I described earlier, the inputs are turned into the outputs via an
          affine transformation. Given the input values, we can simply perform a
          dot product between them and the weights and follow up with an
          additional translation. Remember, for a single neuron, we want to
          multiply the input values with each of the weight values that neuron
          holds. So for all neurons of a layer, we can perform a dot product to
          effectively apply transformation. The dot product is optimised by the
          numpy library for its matrices. Below is the matrix multiplication
          visual between the weights and the input values `a`.
        </p>
        <img
          src="/images/ai-blog/matrix.png"
          className="imgS"
          title="Image from 3Blue1Brown"
        />
        <p>
          There is another type of layer, which I have mentioned before, called
          activation layers. These are quite simple in that they just apply a
          transformation function on each input. This is needed because it adds
          non-linearity to the model enabling it to learn and represent complex
          data patterns, and without it a linear model would be fairly useless.
          The actual function applied is not pre-decided, just like the weight
          initialisation method. It must be chosen based on context and
          potential synergies.
        </p>
        <img
          src="/images/ai-blog/activationfunctions.png"
          className="imgC"
          title="activation functions"
        />
        <p>
          Here I have created an interface for 2 different activation functions.
          I have chosen the ReLU (Rectified Linear Unit) function, which simply
          allows positive values to pass through unchanged while setting all
          negative values to zero, as the main activation function within the NN
          . I have also included the softmax activation layer which will only be
          used as the output layer. There are many others, each with their own
          properties. You will also notice the implementation of the derived
          version of these functions being defined. Although not relevant here,
          they will be necessary later on.
        </p>
        <img
          src="/images/ai-blog/activationlayer.png"
          className="imgC"
          title="activation layer"
        />
        <p>
          For the actual activation layer class, we will take the activation
          function reference and its derived function reference as instance
          variables. And in the `feed_forward` function, we simply apply the
          activation function onto the input and return that result.
        </p>
        <h3>Putting it together</h3>
        <img
          src="/images/ai-blog/neuralnetworkbefore.png"
          className="imgC"
          title="creating neural network"
        />
        <p>
          We have nearly reached the halfway point. I have defined the actual NN
          class which maintains a list of layers, a function to add a layer, and
          a function to return the final output for a given input. It seems
          strange to have `output = input_data` but think of the function being
          performed in steps. First we have the input, then we pass it through
          the layers by looping through them, and finally we return that array.
          So the `output` variable is named after its usecase being the returned
          array of the function.
        </p>
        <h2>Creating the Neural Network</h2>
        <img
          src="/images/ai-blog/createnn.png"
          className="imgC"
          title="instantiating neural network object"
        />
        <p>
          I have instantiated a NN object and added a few fully connected layers
          with activation layers in between them. Notice how the output to one
          fully connected layer must match the size of the input for the next.
          This also applies to the final layer which must have a size of 10, as
          there are 10 possible digits. For adding the activation layers, I use
          the .use() functions to pass the function references to the
          constructor. Now if I was to print the result of the network's predict
          function (shown in the previous image), it would likely give me some
          bs like [[ 0.27 -0.14 -0.55 -0.19 -0.06 0.09 -0.95 0.44 -1.02]]. This
          is the output of the NN with the first image with random weights and
          no training. Clearly, it has no idea what the image is. Lets fix that.
        </p>
        <h3>Training</h3>e
        <p>
          image of cost function - have the random output next to desired output
        </p>
        <p>
          In order to improve a model, you need to first figure out how to
          measure the success of the model. We know the exact digit value for
          each image - inside training_labels. So the next step is to derive a
          cost function that compares the produced result with the desired one.
        </p>
        <img
          src="/images/ai-blog/costfunctions.png"
          className="imgC"
          title="cost functions"
        />
        <p>
          I have defined the cost function similarly to the Activation
          Functions, where we require both the standard and its derived form.
          The reason we define the derived form is that it enables us to carry
          out gradient descent. This optimisation algorithm uses the gradient of
          the cost function to figure out how we need to adjust the parameters
          in order to reduce said cost.
        </p>

        <p>image of new neural network with cost also gradient descent image</p>
        <p>TALK ABOUT why gradient descent</p>

        <p>image of back propagation visual</p>
        <p>TALK ABOUT for back p explain</p>

        <img
          src="/images/ai-blog/backpforfull.png"
          className="imgC"
          title="back propagation for fully connected layer"
        />
        <img
          src="/images/ai-blog/backpforactiv.png"
          className="imgC"
          title="back propagation for activation layer"
        />
        <p>TALK ABOUT for back p</p>

        <img
          src="/images/ai-blog/trainpt1.png"
          className="imgC"
          title="training function"
        />
        <p>
          TALK ABOUT each parameter. then why we segment them into different
          batches
        </p>
        <img
          src="/images/ai-blog/trainpt2.png"
          className="imgC"
          title="complete training function"
        />
        <p>TALK ABOUT last little bit</p>
        <h3>Using the Neural Network to classify images</h3>
        <h2>What I learnt and further work</h2>
        <p>
          processes tokens sequentially with finite cost per token. therefore,
          letting the LLM 'think' through an answer can result in better
          answers. this is the same as asking for the answer through code, where
          the model can perform better. the model will run the code separately
          and return the answer. The cognition of the LLM is different to that
          of you and I. Problems can be difficult for the LLM that are trivial
          to us and vice versa.
        </p>
        <p>
          I can improve this model in many ways. obviously adjusting parameters
          is essential in machine learning... talk about more complicated stuff
        </p>
        <h3>References</h3>
        <li id="fn-1">
          {" "}
          <a 
            href="https://en.wikipedia.org/wiki/MNIST_database"
            target="_blank"
            rel="noopener noreferrer"
            className="footnote"
          >
            MNIST database{" "}
          </a>
          <a href="#ref-1" className="footnote">
            ↩
          </a>
        </li>
        <li id="fn-2">
          {" "}
          <a 
            href="https://numpy.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="footnote"
          >
            Numpy{" "}
          </a>
          <a href="#ref-2" className="footnote">
            ↩
          </a>
        </li>
        <p>_</p>
      </div>
    </div>
  );
}
