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
          fitness coach, language expert... all at once felt unbelievable. At
          uni I was able to learn about some of the underlying theory behind
          AI/ML such as logistic regression, information theory, Bayes theory
          etc. Whilst this was interesting, I prefer to implement and visualise
          the mechanics to show exactly how it works. Lets begin!
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
          "Hello World!" if you will. I found this to be great at showing the
          pure logic behind how maths is used in AI/ML. It will be written in
          Python and use the numpy library
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
          rgb/a values so this will be the input to the NN. The image above
          shows exactly how the 28x28 pixels make up an example image. Where
          values closer to 0 are darker and values closer to 1 are lighter. In
          reality, images use more than just a single value so that we can
          visualise colours instead of just black and white. This database
          simplifies that and just gives us numbers from 0 to 255 for their
          colour.
        </p>
        <img
          src="/images/ai-blog/gettingtrainingdata.png"
          className="imgC"
          title="getting training data"
        />
        <p>
          As I said, I will be using the MNIST database to source 60,000 of
          these images of handwritten digits. The database has a further 10,000
          images of handwritten digits that will be used to test the NN to see
          if it can still recognise digits on new images. I will obtain these
          through the scikit-learn library. In the retrieval line, I set
          `as_frame` to false and parser to `liac-arff` which leaves the input
          data as numpy arrays. I store both the training images and their
          corresponding labels into separate variables extracted from the MNIST
          database.
        </p>
        <img
          src="/images/ai-blog/normalisetraining.png"
          className="imgC"
          title="normalising training data"
        />
        <p>
          An important step with our image data is to normalise the values (put
          into a [0,1] range as seen in the image of the 3). There are a number
          of reasons for this, it ensures a consistent scale across all input
          features, helps gradient descent algorithms, and works better with
          activation functions. We will look at gradient descent and activation
          functions later on. To do this, I divide all the values by 255.
        </p>
        <img
          src="/images/ai-blog/inputoutput.png"
          className="imgS"
          title="Image from 3Blue1Brown"
        />
        <p>
          In terms of the output to our NN it will be a single vector with the
          number of possible digits as its length, this is shown as the
          rightmost vector and the input being the 784 pixel values on the left.
          When we begin training, we should think of the NN as a baby with very
          little idea as to what the digit is. However, eventually the NN should
          learn about the images and produce high confidence values (~1) for the
          digit it determines as correct and low confidence values for all the
          other digits (~0). If the input image was 5, then we should see a
          value closer to 1 in that sixth index (index from 0) of the output
          vector.
        </p>
        <h3>Neural Network Layers</h3>
        <img
          src="/images/ai-blog/affine.png"
          className="img"
          title="affine transformation"
        />
        <p>
          The first thing you notice about NNs are that there are lots of layers
          and connections between them. The actual number of layers and how many
          neurons within them is rather arbitrary and context specific. There
          are different types of layers, the main one to think about is a fully
          connected layer. As the name suggests, every neuron in a layer has a
          connection with every neuron in the previous layer. To compute the
          output for each neuron in a fully connected layer, we do an affine
          transformation shown above. Each neuron holds weight values for every
          neuron in the previous layer, shown in green. To compute the output,
          we multiply the output values in the previous layer with their
          corresponding weights and also add a bias value at the end. The values
          here are also arbitrary so don't look too much into that. A good
          exercise is to think about how this could be coded.
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
          have two parameters: input_size ~ number of neurons in previous layer,
          output_size ~ number of neurons for the current layer. We call the
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
        <p> </p>
        <img
          src="/images/ai-blog/matrix.png"
          className="imgS"
          title="Image from 3Blue1Brown"
        />
        <p>
          As I described earlier, the inputs are turned into the outputs via an
          affine transformation. Given the input values, we can simply perform a
          dot product between them and the weights and follow up with an
          additional translation. Remember, for a single neuron, we want to
          multiply the input values with each of the weight values that neuron
          holds. So for all neurons of a layer, we can perform a dot product to
          effectively apply that transformation. The dot product is optimised by
          the numpy library for its matrices. Above is the matrix multiplication
          visual between the weights and the input values with the bias value as
          an additional translation, which may help if you are familiar with
          linear algebra.
        </p>
        <img
          src="/images/ai-blog/activate.png"
          className="img"
          title="Image of activation function"
        />
        <p>
          There is another type of layer, which I have mentioned before, called
          activation layers. These are quite simple in that they just apply a
          transformation function on each input. This is needed because it adds
          non-linearity to the model enabling it to learn and represent complex
          data patterns, and without it a linear model would be fairly useless.
          The actual function applied is not pre-decided, just like the weight
          initialisation method. It must be chosen based on context and
          potential synergies. Above I have shown a tanh activation layer which
          just applies the tanh function to each of the previous outputs.
        </p>
        <img
          src="/images/ai-blog/activation.png"
          className="imgC"
          title="activation functions"
        />
        <p>
          Here I have created an interface for 2 different activation functions.
          I have chosen the ReLU (Rectified Linear Unit) function, which simply
          allows positive values to pass through unchanged while setting all
          negative values to zero, as the main activation function within the
          NN. I have also included the tanh activation layer which was shown in
          the previous diagram although for which I won't be using in this
          program. There are many others, each with their own properties. You
          will also notice the implementation of the derived version of these
          functions. Although not relevant here, they will be necessary later
          on.
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
          activation function onto the input and return that result. Since
          self.activation is a reference to a function, we just apply it
          directly.
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
          src="/images/ai-blog/NNuse.png"
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
        <h3>Training</h3>
        <img
          src="/images/ai-blog/cost.png"
          className="img"
          title="Image of activation function"
        />
        <p>
          In order to improve a model, you need to first figure out how to
          measure the success of the model. We know the exact digit value for
          each image - inside training_labels. So the next step is to derive a
          cost function that compares the produced result with the desired one.
          Above I have shown one such cost function - mean squared error. This
          simply adds up the averages between the result and the actual to
          produce a cost. As you can probably imagine we want to reduce this
          cost. To add context to the values, the actual values will always be
          fully confident in the given digit, whilst the predicted result will
          range. If the predicted values wrongly predicted other digits, the
          cost function should penalise those in order to discourage wrong
          predictions. Remember that this is averaged across all the images
          otherwise the model would be skewed towards predicting a specific
          digit.
        </p>
        <img
          src="/images/ai-blog/costfunction.png"
          className="imgC"
          title="cost functions"
        />
        <p>
          I have defined the cost function similarly to the Activation
          Functions, where we require both the standard and its derived form.
          The reason we also define the derived form is that it enables us to
          carry out gradient descent. Before I get onto gradient descent, the
          cost function I decided to use is cross-entropy. All cost functions,
          including the mean squared error, measures how far your predicted
          probability distribution is from the true distribution. Here, cross
          entropy uses the negative log to heavily penalise confident wrong
          predictions. I also clipped the prediction to stop the values
          exploding. Although I used cross-entropy here, I could also use the
          mean-squared error or other cost functions if applicable.
        </p>
        <img
          src="/images/ai-blog/graedi.png"
          className="imgS"
          title="gradient descent"
        />
        <p>
          In order to iteratively improve the model, I will be using a method to
          minimise the cost called gradient descent. From the diagram you can
          see a 3D representation of how we follow the path of the negative
          gradient to reach the lowest cost. For clarification, the lower the
          cost value, the higher the model is confident about a prediction. This
          is why I included the derivative of the cost function in the
          CostFunctions class as that is how we move in the direction of lowest
          cost.
        </p>

        <img
          src="/images/ai-blog/back.png"
          className="imgS"
          title="Image from 3Blue1Brown"
        />
        <p>
          Now the actual training of the network is done through a method called
          back propagation. This is the most technical part and has various
          foundations in calculus for which you can get one of the best
          explanations out there at 3Blue1Brown
          <a href="#fn-3" id="ref-3" className="footnote">
            <sup>3</sup>
          </a>{" "}
          (lots of these images are from his video series on NNs). To perform
          back propagation, we will use a function which essentially recursively
          follows through the network back to front. In the diagram above, the
          arrows represent the desired change we wish for each of the output
          values. This is actually computed as an "error" value for each of the
          output values.
        </p>
        <img
          src="/images/ai-blog/crossderived.png"
          className="imgC"
          title="cross function derived"
        />
        <p>
          I wanted to reiterate the derivation of the cost function here which
          is used to compute this error. The higher the difference between the
          predicted and actual value, gives a higher error. Importantly, this
          error is returned as an array so unlike the cost function it's an
          individual error associated with each neuron.
        </p>
        <img
          src="/images/ai-blog/backpuse.png"
          className="imgC"
          title="back propagation for fully connected layer"
        />
        <p>
          Here I have shown an overview of how backpropagation will work. Here
          we will feedforward an input through the network to get its initial
          output then compute the error list, then back propagate making sure to
          pass that error through the list.
        </p>
        <img
          src="/images/ai-blog/backpforfull.png"
          className="imgC"
          title="back propagation for activation layer"
        />
        <p>
          Here is the back propagation code. Firstly, we want to calculate the
          input error. This represents how much influence each of the input
          neurons had on each of the output's error value. I applied the chain
          rule to compute this and apply it again to calculate how much the
          weight's influence had on the output error. Whilst the input error is
          returned to be passed through to the previous layer, we must adjust
          the weight values at the current layer. Finally, adjust the bias value
          so we can adjust the computed activation by the accumulated error. I
          again would highly recommend watching the 3Blue1Brown video series,
          especially the last 2 on backpropagation, if you want to get a much
          more detailed and expressive explanation.
        </p>
        <img
          src="/images/ai-blog/backpforactiv.png"
          className="imgC"
          title="back propagation for activation layer"
        />
        <p>
          I will also quickly show the back propagation step for activation
          layers which is very simple. Since there are no weights/biases we
          simply pass through the values with the derivation of the activation
          function multiplied by its corresponding error value.
        </p>

        <img
          src="/images/ai-blog/trainpt1.png"
          className="imgC"
          title="training function"
        />
        <p>
          Now, in theory, I would be able to run the back propagation on all
          inputs and average their results all at once. However, doing so is
          computationally very expensive. Instead, a common method is to divide
          the input into batches and run them with back propagation one by one.
          For reference an epoch is a full round of the input, so one epoch in
          this case goes through all 60,000 images. The batches are computed by
          segmenting the input list into regular sized mini-lists from this
          batch-index to the (batch-index + batch-size). The if statement part
          is just making sure we finish all the inputs in case the batch-size
          doesn't divide equally into the input size, nothing too difficult.
        </p>
        <img
          src="/images/ai-blog/trainpt2.png"
          className="imgC"
          title="complete training function"
        />
        <p>
          Finally I add in the actual training code for each batch. All in all
          it is relatively simple and the hardest parts would be understanding
          what back propagation is doing behind the hood and adjusting the
          parameters to maximise the accuracy of the predictions.
        </p>
        <h3>Using the Neural Network to classify images</h3>
        <img
          src="/images/ai-blog/fain.png"
          className="imgC"
          title="applying NN"
        />
        <p>
          To use the code, first I want to separate the images with the test
          images. The first 60,000 should be used for training and the last
          10,000 should be used for testing the network. We then adjust the
          output labels to that vector form~transformed_labels. One thing I
          forgot was the learning rate which controls how aggressively the model
          will adjust itself during back propagation. Then to check the
          predicton, I would run the test images on the network, count up the
          correct ones and divide it by the number of images.
        </p>
        <img src="/images/ai-blog/result.png" className="img" title="result" />
        <p>
          Here, I added some debug code within the train function which you can
          see being outputted. The accuracy of the NN is 93.61% which is not the
          best but you can see that it is working mostly. With more tweaking,
          whether that is the number/size of the layers or the training
          parameters, I am sure I can get it to be a higher accuracy.
        </p>
        <h2>What I learnt and further work</h2>
        <p>
          I wanted to go through this process because I thought I was falling
          behind the curve with AI. While this is just the beginning, I am quite
          chuffed with how relatively easy it was to produce this classification
          NN. There were a lot of concepts that I learnt already at uni that I
          was able to reference and use in this project which felt especially
          great.
        </p>
        <p>
          For the future, I have planned to produce a few other projects with
          relevance to AI/ML. Using the NN that I have created, I plan to create
          a simple chatbot and an AI for tictactoe. Stay tuned!
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
        <li id="fn-3">
          {" "}
          <a
            href="https://youtu.be/Ilg3gGewQ5U?si=_2_ekiqFXFIc3L8-"
            target="_blank"
            rel="noopener noreferrer"
            className="footnote"
          >
            3Blue1Brown{" "}
          </a>
          <a href="#ref-3" className="footnote">
            ↩
          </a>
        </li>
        <p>_</p>
      </div>
    </div>
  );
}
