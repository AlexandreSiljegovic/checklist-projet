const Fonctionnement = () => {
    return (
        <div className="fonctionnement">
        <center>
          <h1 >How it works</h1>
          <p>
            Press the "<span class="action-modify">Create a list</span>" in the top left or in the navigation to create a list.
          </p>
          <p>
            You can <span class="action-modify">modify</span> the list / tasks title and description by clicking on the "<span class="action-modify">Modify a list</span>" then "<span class="action-modify">Modify</span>" button then "<span class="action-edit">Edit</span>" and finally you can save your changes.
          </p>
          <p>
            You can change the <span className="action-modify">statut </span> of the list and task by clicking on the <span className="action-modify">Statut</span> link in the nav. 0 = in progress, 1 = completed, 2 = cancelled.
          </p>
          <p>
            You can <span class="action-delete">delete</span> the list by clicking on the "<span class="action-delete">Delete</span>" button.
          </p>
        </center>

        
        </div>
    );
    };
export default Fonctionnement;